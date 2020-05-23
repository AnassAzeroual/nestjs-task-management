import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'event' })
export class AppGateway implements OnGatewayInit {

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
