import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Toy } from './Toy';

@Entity()
export class Brand {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(type => Toy, toy => toy.brand)
    toys: Toy[];
}