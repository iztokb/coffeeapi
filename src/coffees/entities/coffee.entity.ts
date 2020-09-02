import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Coffee {
  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavours: string[];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
