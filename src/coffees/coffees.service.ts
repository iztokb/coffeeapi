import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities';
import { PaginationQueryDto } from 'src/common/dto';
import { Event } from 'src/events/entities';
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly _coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly _flavourRepository: Repository<Flavour>,
    private readonly _connection: Connection,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map(name => this._preloadFlavourByName(name)),
    );

    const coffee = this._coffeeRepository.create({
      ...createCoffeeDto,
      flavours,
    });

    return await this._coffeeRepository.save(coffee);
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    const { limit, offset } = paginationQuery;
    return await this._coffeeRepository.find({
      relations: ['flavours'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this._coffeeRepository.findOne(id, {
      relations: ['flavours'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} was not found`);
    }

    return coffee;
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);

    return await this._coffeeRepository.remove(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavours =
      updateCoffeeDto.flavours &&
      (await Promise.all(
        updateCoffeeDto.flavours.map(name => this._preloadFlavourByName(name)),
      ));

    const coffee = await this._coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} was not found`);
    }

    return await this._coffeeRepository.save(coffee);
  }

  private async _preloadFlavourByName(name: string): Promise<Flavour> {
    const existingFlavour = await this._flavourRepository.findOne({ name });

    if (existingFlavour) {
      return existingFlavour;
    }

    return await this._flavourRepository.create({ name });
  }
}
