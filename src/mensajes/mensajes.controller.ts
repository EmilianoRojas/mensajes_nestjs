import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {
    constructor(private mensajeService: MensajesService){}

    @Post()
    create (@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        this.mensajeService.createMensaje(createMensajeDto).then( mensaje =>{
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.BAD_REQUEST).json({mensaje: 'Error creando mensaje'});
        });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAll().then( mensajesList=>{
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(() =>{
            response.status(HttpStatus.BAD_REQUEST).json({mensaje: 'Error al obtener mensajes'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje)
        }).catch( () =>{
            response.status(HttpStatus.BAD_REQUEST).json({mensaje: 'Error al actualizar mensaje'});

        })
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.mensajeService.deleteMensaje(idMensaje).then( mensaje =>{
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(() =>{
            response.status(HttpStatus.BAD_REQUEST).json({mensaje: 'Error al eliminar mensaje'});
            
        })
    }
}
