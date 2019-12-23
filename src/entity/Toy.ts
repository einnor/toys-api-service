import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, AfterLoad } from 'typeorm';
import { Numbers } from '../lib/Numbers';
import { Brand } from './Brand';
import { Category } from './Category';

@Entity()
export class Toy {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Brand, brand => brand.toys)
  brand: Brand;

  @Column()
  model: string;

  @ManyToOne(type => Category, category => category.toys)
  category: Category;

  @Column()
  description: string;

  @Column('decimal', {
    precision: 15,
    scale:     2
  })
  price: number;

  @Column()
  imageUrl: string;

  @AfterLoad() _convertDecimals()
  {
    this.price  = Numbers.convertToDecimal(this.price);
  }
}