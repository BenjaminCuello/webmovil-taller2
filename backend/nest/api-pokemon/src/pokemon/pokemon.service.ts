import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
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

  async findAll(limit = 20, offset = 0): Promise<{ items: Pokemon[]; total: number }> {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const safeOffset = Math.max(offset, 0);
    const [items, total] = await this.pokemonRepository.findAndCount({
      order: { id: 'ASC' },
      take: safeLimit,
      skip: safeOffset,
    });
    return { items, total };
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

  async countAll(): Promise<number> {
    return this.pokemonRepository.count();
  }

  async seed(pokemons: SeedPokemon[]): Promise<void> {
    if (!pokemons.length) {
      return;
    }

    const names = pokemons.map((pokemon) => pokemon.name);
    await this.pokemonRepository.delete({ name: In(names) });

    await this.pokemonRepository.save(
      pokemons.map((pokemon) => this.pokemonRepository.create(pokemon)),
    );
  }
}
