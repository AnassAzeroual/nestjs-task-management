import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, { namespace: 'event' })
export class AppGateway implements OnGatewayInit {

  /* -------------------------------------------------------------------------- */
  /*                                  BroadCast                                 */
  /* -------------------------------------------------------------------------- */

  @WebSocketServer() wss: Server;

  /* -------------------------------------------------------------------------- */
  /*                                 Make Logger                                */
  /* -------------------------------------------------------------------------- */

  logger: Logger = new Logger('App GateWay')

  /* -------------------------------------------------------------------------- */
  /*                               Connection Zone                              */
  /* -------------------------------------------------------------------------- */

  handleConnection(client: Socket, ...args: any[]) {
    // throw new Error("Method not implemented.");
    this.logger.debug(`App Getway handleConnection : ${client}`)
  }

  handleDisconnect(client: any) {
    // throw new Error("Method not implemented.");
    this.logger.debug(`App Getway handleDisconnect : ${client}`)
  }


  /* -------------------------------------------------------------------------- */
  /*                               OnInit Function                              */
  /* -------------------------------------------------------------------------- */

  afterInit(server: any) {
    this.logger.log('is OK!')
  }

  /* -------------------------------------------------------------------------- */
  /*                             OnCall msgToServer                             */
  /* -------------------------------------------------------------------------- */
  // message: { sender: string, room: string, message: string }
  @SubscribeMessage('sendMessage')
  async handleMessage(client, message: { room: string, user: string, msg: any }) {
    console.log(message.room);
    // this.wss.to(message.room).emit('getResponse', message);
    client.broadcast.emit('getResponse', message);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  join room                                 */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string) {
    console.log(room);
    client.join(room);
    this.wss.to(room).emit('roomCreated', { 'room': room });
  }

  /* -------------------------------------------------------------------------- */
  /*                                 leave room                                 */
  /* -------------------------------------------------------------------------- */
  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    console.log(room);
    client.leave(room)
    client.emit('leftRoom', room)
  }


}
