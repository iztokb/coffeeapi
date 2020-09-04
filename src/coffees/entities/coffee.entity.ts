import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavour } from './flavour.entity';

@Entity()
export class Coffee {
  @Column()
  brand: string;

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    type => Flavour,
    flavour => flavour.coffees, // what is "coffee" within the Flavor Entity
    {
      cascade: true,
    },
  ) // 👈
  flavours: Flavour[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  recommendations: number;
}
