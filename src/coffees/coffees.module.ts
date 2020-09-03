import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee, Flavour } from './entities';
import { Event } from 'src/events/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
