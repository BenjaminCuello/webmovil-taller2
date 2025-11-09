import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PokemonService, SeedPokemon } from './pokemon/pokemon.service';

const SEED_POKEMON: SeedPokemon[] = [
  {
    id: 25,
    name: 'Pikachu',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    heightM: 0.4,
    weightKg: 6,
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
  },
  {
    id: 1,
    name: 'Bulbasaur',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    heightM: 0.7,
    weightKg: 6.9,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 2,
    name: 'Ivysaur',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    types: ['grass', 'poison'],
    heightM: 1,
    weightKg: 13,
    stats: {
      hp: 60,
      attack: 62,
      defense: 63,
      specialAttack: 80,
      specialDefense: 80,
      speed: 60,
    },
  },
  {
    id: 3,
    name: 'Venusaur',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    types: ['grass', 'poison'],
    heightM: 2,
    weightKg: 100,
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80,
    },
  },
  {
    id: 4,
    name: 'Charmander',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['fire'],
    heightM: 0.6,
    weightKg: 8.5,
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65,
    },
  },
  {
    id: 6,
    name: 'Charizard',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    types: ['fire', 'flying'],
    heightM: 1.7,
    weightKg: 90.5,
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      specialAttack: 109,
      specialDefense: 85,
      speed: 100,
    },
  },
  {
    id: 7,
    name: 'Squirtle',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    types: ['water'],
    heightM: 0.5,
    weightKg: 9,
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43,
    },
  },
  {
    id: 94,
    name: 'Gengar',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    types: ['ghost', 'poison'],
    heightM: 1.5,
    weightKg: 40.5,
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110,
    },
  },
  {
    id: 151,
    name: 'Mew',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
    types: ['psychic'],
    heightM: 0.4,
    weightKg: 4,
    stats: {
      hp: 100,
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      speed: 100,
    },
  },
  {
    id: 143,
    name: 'Snorlax',
    spriteDefault:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
    spriteArtwork:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
    types: ['normal'],
    heightM: 2.1,
    weightKg: 460,
    stats: {
      hp: 160,
      attack: 110,
      defense: 65,
      specialAttack: 65,
      specialDefense: 110,
      speed: 30,
    },
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const service = app.get(PokemonService);
    await service.seed(SEED_POKEMON);
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Failed to seed data', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
