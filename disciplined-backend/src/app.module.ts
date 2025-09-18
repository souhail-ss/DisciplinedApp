import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalsModule } from './goals/goals.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'goals.db', 
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    GoalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
