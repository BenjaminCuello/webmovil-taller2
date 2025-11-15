import { Controller, Get, Param, Query } from '@nestjs/common';
import { Pokemon } from './pokemon.entity';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Pokemon[]> {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    const safeLimit = Number.isFinite(parsedLimit) ? parsedLimit : undefined;
    const safeOffset = Number.isFinite(parsedOffset) ? parsedOffset : undefined;

    return this.pokemonService.findAll(safeLimit, safeOffset);
  }

  @Get(':idOrName')
  findOne(@Param('idOrName') idOrName: string): Promise<Pokemon> {
    return this.pokemonService.findOne(idOrName);
  }
}
