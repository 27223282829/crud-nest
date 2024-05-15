import { Injectable } from '@nestjs/common';
import { CreateDoctoreDto } from './dto/create-doctore.dto';
import { UpdateDoctoreDto } from './dto/update-doctore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctore } from './entities/doctore.entity';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DoctoresService {
  constructor(
    @InjectRepository(Doctore)
    private readonly doctoreRepository: Repository<Doctore>
  )
  {}
  async create(createDoctoreDto: CreateDoctoreDto) {
    const Doctore = await this.doctoreRepository.create(createDoctoreDto);
    console.log(createDoctoreDto);
    return await this.doctoreRepository.save(Doctore);
  }

  async findAll(): Promise<Doctore[]> {
    return await this.doctoreRepository.find();
  }

  async findOne(id: number): Promise<Doctore | undefined> {
      const options: FindOneOptions<Doctore> = { where: { id }};
    return await this.doctoreRepository.findOne(options);
  }

  async update(id: number, updateDoctoreDto: UpdateDoctoreDto): Promise<Doctore | null> {
    try {
      if (typeof id !== 'number') {
        throw new Error('El ID debe ser un número.');
      }
  
      const doc = await this.doctoreRepository.findOne({where:{id}});
  
      if (!doc) {
        throw new Error(`No se encontró ningún paciente con el ID ${id}`);
      }
  
      // Actualiza las propiedades del paciente con los valores del DTO de actualización
      doc.Nombre = updateDoctoreDto.Nombre;
      doc.apellido = updateDoctoreDto.apellido;
      doc.telefono = updateDoctoreDto.telefono;
      doc.correo = updateDoctoreDto.correo;
  
      // Guarda los cambios en la base de datos
      const docActualizado = await this.doctoreRepository.save(doc);
  
      return docActualizado;
    } catch (error) {
      console.error(`Error al actualizar el paciente con ID ${id}:`, error);
      return null; // Retorna null si ocurre algún error
    }
  }
  

  async remove(id: number): Promise<string> {
    try {
      const deleteResult: DeleteResult = await this.doctoreRepository.delete(id);
      if (deleteResult.affected === 0) {
        return `No se encontró ningún paciente`;
      } else {
        return `doctor eliminado correctamente.`;
      }
    } catch (error) {
      console.error(`Error al eliminar el paciente:`, error);
      return `Error al eliminar el paciente .`;
    }
  }
}
  
