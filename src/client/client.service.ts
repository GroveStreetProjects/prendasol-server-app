import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) { };

  createClient(client: CreateClientDto) {
    const newClient = this.clienteRepository.create(client);
    return this.clienteRepository.save(newClient);
  }

  getAllClients() {
    return this.clienteRepository.find();
  }

  getClient(id: number) {
    return this.clienteRepository.findOne({
      where: {
        Id: id
      }
    });
  }

  deleteClient(id: number) {
    return this.clienteRepository.delete({ Id: id });
  }

  updateUser(id: number, client: UpdateClientDto) {
    this.clienteRepository.update({ Id: id }, client)
  }

}
