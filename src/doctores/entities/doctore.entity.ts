import { IsNotEmpty } from "class-validator";
import { Paciente } from "src/pacientes/entities/paciente.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Doctore {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    Nombre: string;
    @Column()
    apellido: string;
    @Column()
    telefono: number;
    @Column()
    correo: string;
    @ManyToOne(() => Paciente, paciente => paciente.doctores)
    paciente: Paciente;
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
}
