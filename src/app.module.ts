import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
