import { Module } from '@nestjs/common';
import { DoctoresService } from './doctores.service';
import { DoctoresController } from './doctores.controller';
import { Doctore } from './entities/doctore.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Doctore])],
  controllers: [DoctoresController],
  providers: [DoctoresService],
})
export class DoctoresModule {}
