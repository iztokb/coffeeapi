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
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly _coffeesService: CoffeesService) {}
  /**
   * DELETE
   */
  @Delete(':id')
  remove(@Param('id') id: number) {
    // return `Rescord with id ${id} has been deleted.`;
    return this._coffeesService.remove(id);
  }

  /**
   * GET
   */
  @Get()
  getAll(@Query() paginationQuery): Coffee[] {
    const { limit, offset } = paginationQuery;
    //return `Returning list of coffees. Limit ${limit}, current offset ${offset}`;
    return this._coffeesService.findAll(limit, offset);
  }

  @Get(':id')
  getCoffeeById(@Param('id') id: number): Coffee {
    // return `Coffee with id ${id}`;
    return this._coffeesService.findOne(id);
  }

  /**
   * POST
   */
  @Post()
  create(@Body() payload: CreateCoffeeDto): CreateCoffeeDto {
    // return payload;
    return this._coffeesService.create(payload);
  }

  /**
   * UPDATE
   */
  @Patch(':id')
  updatePatch(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): void {
    // return `Coffee with id ${id} has been updated.`;
    return this._coffeesService.update(id, updateCoffeeDto);
  }

  @Put(':id')
  updatePut(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): void {
    // return `Coffee with id ${id} has been updated.`;
    return this._coffeesService.update(id, updateCoffeeDto);
  }
}
