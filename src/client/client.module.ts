import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Cliente } from './client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule { }
