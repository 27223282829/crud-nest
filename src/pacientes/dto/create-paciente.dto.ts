import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePacienteDto {
  id:   number;
  @IsNotEmpty()
  @IsString()
  nombre : string;
  @IsNotEmpty()
  @IsString()
  apellido : string;
  @IsNotEmpty()
  @IsNumber()
  telefono : number;
  @IsNotEmpty()
  @IsEmail()
  correo : string;
  @IsString()
  doctor: string;
  
}
