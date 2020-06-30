import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
const jsonfile = require('jsonfile')

@WebSocketGateway({ namespace: 'event' })
export class AppGateway implements OnGatewayInit {
  obj = []

  /* -------------------------------------------------------------------------- */
  /*                                  BroadCast                                 */
  /* -------------------------------------------------------------------------- */

  @WebSocketServer() wss: Server;

  /* -------------------------------------------------------------------------- */
  /*                                 Make Logger                                */
  /* -------------------------------------------------------------------------- */

  logger: Logger = new Logger('App GateWay');

  /* -------------------------------------------------------------------------- */
  /*                               OnInit Function                              */
  /* -------------------------------------------------------------------------- */

  afterInit(server: any) {
    this.logger.log('is OK!')
  }

  /* -------------------------------------------------------------------------- */
  /*                             OnCall msgToServer                             */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('sendMessage')
  async handleMessage(client, message: { room: string, user: string, msg: any }) {
    const file = './mayAlreadyExistedData.json'
    this.obj.push(message);
    jsonfile.writeFileSync(file, this.obj, { flag: 'w' })

    jsonfile.readFile(file)
      .then(obj => console.dir(obj))
      .catch(error => console.error(error))

    client.broadcast.emit('getResponse', message);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  join room                                 */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string) {
    client.join(room);
    this.wss.to(room).emit('roomCreated', { 'room': room });
  }

  /* -------------------------------------------------------------------------- */
  /*                                 leave room                                 */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    client.leave(room)
    client.emit('leftRoom', room)
  }


}
