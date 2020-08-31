import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly brand: string;
  @IsString({ each: true })
  readonly flavours: string[];
  @IsString()
  readonly name: string;
}
