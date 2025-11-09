import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

export interface SeedPokemon {
  id: number;
  name: string;
  spriteDefault: string;
  spriteArtwork: string;
  types: string[];
  heightM: number;
  weightKg: number;
  stats: Record<string, number>;
}

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async findAll(limit = 20, offset = 0): Promise<Pokemon[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const safeOffset = Math.max(offset, 0);
    return this.pokemonRepository.find({
      order: { id: 'ASC' },
      take: safeLimit,
      skip: safeOffset,
    });
  }

  async findOne(idOrName: string): Promise<Pokemon> {
    const numericId = Number(idOrName);

    if (!Number.isNaN(numericId)) {
      const byId = await this.pokemonRepository.findOne({
        where: { id: numericId },
      });
      if (byId) {
        return byId;
      }
    }

    const byName = await this.pokemonRepository.findOne({
      where: { name: ILike(idOrName) },
    });
    if (byName) {
      return byName;
    }

    throw new NotFoundException(`Pokemon ${idOrName} not found`);
  }

  async seed(pokemons: SeedPokemon[]): Promise<void> {
    if (!pokemons.length) {
      return;
    }

    await this.pokemonRepository.upsert(pokemons, {
      conflictPaths: ['id'],
    });
  }
}
