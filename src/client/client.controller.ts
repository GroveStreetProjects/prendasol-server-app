import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { ClientService } from './client.service';
import { Cliente } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clientes')
export class ClientController {

  constructor(private clientService: ClientService) { };

  @Post()
  createClient(@Body() newClient: CreateClientDto): Promise<Cliente> {
    return this.clientService.createClient(newClient);
  }

  @Get()
  getAllClients(): Promise<Cliente[]> {
    return this.clientService.getAllClients();
  }

  @Get(':ci')
  getClient(@Param('ci') ci: string) {
    return this.clientService.getClient(ci);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteClient(id);
  }

  @Patch(':id')
  updateClient(@Param('id', ParseIntPipe) id: number, @Body()
  user: UpdateClientDto) {
    return this.clientService.updateUser(id, user);
  }

}
