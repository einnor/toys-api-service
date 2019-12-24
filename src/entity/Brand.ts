import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Toy } from './Toy';

@Entity()
export class Brand {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({
      readonly: true
    })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Toy, toy => toy.brand)
    toys?: Toy[];
}