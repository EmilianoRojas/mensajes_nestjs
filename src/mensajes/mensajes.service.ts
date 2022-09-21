import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)
        private readonly MensajeRepository: Repository<Mensaje>,
    ) {}

    async getAll(): Promise<Mensaje[]> { 
        return await this.MensajeRepository.find();
    }

    async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return await this.MensajeRepository.save(nuevo);
    }

    async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje>{
        const mensajeUpdate = await this.MensajeRepository.findOneBy({id: idMensaje}); 
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje

        return await this.MensajeRepository.save(mensajeUpdate);
    }

    async deleteMensaje(idMensaje: number): Promise<any>{
        return await this.MensajeRepository.delete(idMensaje);
    }
}
