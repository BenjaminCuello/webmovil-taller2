import { Controller, Get, Param, Query } from '@nestjs/common';
import { Pokemon } from './pokemon.entity';
import { PokemonService } from './pokemon.service';

interface PokeApiListItem {
  name: string;
  url: string;
}

interface PokeApiListResponse {
  count: number;
  results: PokeApiListItem[];
}

interface PokeApiStat {
  base_stat: number;
  stat: { name: string };
}

interface PokeApiType {
  slot: number;
  type: { name: string };
}

interface PokeApiSprites {
  front_default: string;
  back_default: string | null;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

interface PokeApiDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokeApiType[];
  sprites: PokeApiSprites;
  stats: PokeApiStat[];
}

function mapToPokeApiListItem(pokemon: Pokemon): PokeApiListItem {
  return {
    name: pokemon.name,
    url: `/pokemon/${pokemon.id}`,
  };
}

function mapToPokeApiDetail(pokemon: Pokemon): PokeApiDetail {
  const types: PokeApiType[] = (pokemon.types || []).map((name, index) => ({
    slot: index + 1,
    type: { name },
  }));

  const stats: PokeApiStat[] = Object.entries(pokemon.stats || {}).map(
    ([name, value]) => ({
      base_stat: value as number,
      stat: { name },
    }),
  );

  const height = Math.round((pokemon.heightM ?? 0) * 10);
  const weight = Math.round((pokemon.weightKg ?? 0) * 10);

  return {
    id: pokemon.id,
    name: pokemon.name,
    height,
    weight,
    types,
    sprites: {
      front_default: pokemon.spriteDefault,
      back_default: null,
      other: {
        'official-artwork': {
          front_default: pokemon.spriteArtwork,
        },
      },
    },
    stats,
  };
}

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<PokeApiListResponse> {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    const safeLimit = Number.isFinite(parsedLimit) ? parsedLimit : undefined;
    const safeOffset = Number.isFinite(parsedOffset) ? parsedOffset : undefined;

    const { items, total } = await this.pokemonService.findAll(
      safeLimit,
      safeOffset,
    );

    return {
      count: total,
      results: items.map(mapToPokeApiListItem),
    };
  }

  @Get(':idOrName')
  async findOne(@Param('idOrName') idOrName: string): Promise<PokeApiDetail> {
    const pokemon = await this.pokemonService.findOne(idOrName);
    return mapToPokeApiDetail(pokemon);
  }
}
