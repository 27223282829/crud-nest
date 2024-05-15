import { Doctore } from "src/doctores/entities/doctore.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Paciente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    telefono: number;

    @Column()
    correo: string;


    @OneToMany(() => Doctore, doctor => doctor.paciente)
    doctores: Doctore[];

    
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

}
