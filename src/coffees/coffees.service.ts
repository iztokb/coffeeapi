import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeesService {
  private _coffees: Coffee[] = [
    {
      brand: 'Barcaffe',
      flavours: ['mild'],
      id: 1,
      name: 'Barcaffe',
    },
    {
      brand: 'Santana',
      flavours: ['strong'],
      id: 2,
      name: 'Santana',
    },
    {
      brand: 'Loka kava',
      flavours: ['very mild'],
      id: 3,
      name: 'Loka kava',
    },
    {
      brand: 'Franck kava',
      flavours: ['medium'],
      id: 4,
      name: 'Franck kava',
    },
    {
      brand: 'Escobar',
      flavours: ['strong'],
      id: 5,
      name: 'Escobar',
    },
  ];

  create(createCoffeeDto: CreateCoffeeDto) {
    const ids = this._coffees.map(item => item.id);
    const maxId = Math.max(...ids);

    const newRecord: Coffee = {
      ...createCoffeeDto,
      id: maxId + 1,
    };
    this._coffees.push(newRecord);

    return createCoffeeDto;
  }

  findAll(limit: number, offset: number): Coffee[] {
    return this._coffees;
  }

  findOne(id: number): Coffee {
    const coffee = this._coffees.find(record => record.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} was not found`);
    }

    return coffee;
  }

  remove(id: number) {
    const existingCoffeeIndex = this._coffees.findIndex(
      record => record.id === id,
    );

    if (existingCoffeeIndex >= 0) {
      this._coffees.splice(existingCoffeeIndex, 1);
    }
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);

    const updatedCoffee = {
      ...existingCoffee,
      ...updateCoffeeDto,
    };

    const records = this._coffees.map(coffee => {
      if (coffee.id === updatedCoffee.id) {
        return updatedCoffee;
      } else {
        return coffee;
      }
    });

    // Replace source with updated records
    this._coffees = records;
  }
}
