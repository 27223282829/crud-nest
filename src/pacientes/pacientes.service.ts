import { Injectable, Delete } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, DeleteResult} from 'typeorm';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>
  )
  {}
  async getPacienteWithDoctor(userId: number) {
    const paciente = await this.pacienteRepository.find({ 
      where: { id: userId },
      relations: ['doctores']
    });

    // Devolver solo el primer paciente encontrado (ya que debería ser único)
    return paciente.length > 0 ? paciente[0] : null;
  }
  
  async create(createpacienteDto: CreatePacienteDto) {
    const paciente = this.pacienteRepository.create(createpacienteDto);
    console.log(createpacienteDto);
    return await this.pacienteRepository.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find();  
  }

  async findOne(id: number): Promise<Paciente | undefined> {
      const options: FindOneOptions<Paciente> = { where: { id } };
  return await this.pacienteRepository.findOne(options);
  }

  // update(id: number, updatePacienteDto: UpdatePacienteDto){
  //   console.log(updatePacienteDto);
  //   return `This action updates a #${id} paciente`;
  // }

  async update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<Paciente | null> {
    try {
      if (typeof id !== 'number') {
        throw new Error('El ID debe ser un número.');
      }
  
      const paciente = await this.pacienteRepository.findOne({where:{id}});
  
      if (!paciente) {
        throw new Error(`No se encontró ningún paciente con el ID ${id}`);
      }
  
      // Actualiza las propiedades del paciente con los valores del DTO de actualización
      paciente.nombre = updatePacienteDto.nombre;
      paciente.apellido = updatePacienteDto.apellido;
      paciente.telefono = updatePacienteDto.telefono;
      paciente.correo = updatePacienteDto.correo;
  
      // Guarda los cambios en la base de datos
      const pacienteActualizado = await this.pacienteRepository.save(paciente);
  
      return pacienteActualizado;
    } catch (error) {
      console.error(`Error al actualizar el paciente con ID ${id}:`, error);
      return null; // Retorna null si ocurre algún error
    }
  }
  
  





  async remove(id: number): Promise<string> {
    try {
      const deleteResult: DeleteResult = await this.pacienteRepository.delete(id);
      if (deleteResult.affected === 0) {
        return `No se encontró ningún paciente`;
      } else {
        return `Paciente eliminado correctamente.`;
      }
    } catch (error) {
      console.error(`Error al eliminar el paciente:`, error);
      return `Error al eliminar el paciente .`;
    }
  }
}
  
