import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDoctoreDto {
    id: number;
    @IsNotEmpty()
    @IsString()
    Nombre : string;
    @IsNotEmpty()
    @IsString()
    apellido: string;
    @IsNotEmpty()
    @IsNumber()
    telefono: number;
    @IsNotEmpty()
    @IsEmail()
    correo:   string;
}
