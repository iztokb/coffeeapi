import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';
import { PaginationQueryDto } from 'src/common/dto';
import { Public, Protocol } from 'src/common/decorators';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly _coffeesService: CoffeesService) {}
  /**
   * DELETE
   */
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Coffee> {
    return await this._coffeesService.remove(id);
  }

  /**
   * GET
   */
  @Get()
  @Public()
  async getAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    console.log('protocol =>', protocol);
    return await this._coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  async getCoffeeById(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
    return await this._coffeesService.findOne(id);
  }

  /**
   * POST
   */
  @Post()
  async create(@Body() payload: CreateCoffeeDto): Promise<Coffee> {
    return await this._coffeesService.create(payload);
  }

  /**
   * UPDATE
   */
  @Patch(':id')
  async updatePatch(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return await this._coffeesService.update(id, updateCoffeeDto);
  }

  @Put(':id')
  async updatePut(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return await this._coffeesService.update(id, updateCoffeeDto);
  }
}
