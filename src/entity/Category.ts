import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Toy } from './Toy';

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(type => Toy, toy => toy.category)
    toys: Toy[];
}