import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { PokemonService, SeedPokemon } from './pokemon/pokemon.service';

async function readSeedsFromFile(): Promise<SeedPokemon[]> {
  const filePath = path.resolve(process.cwd(), 'seed-data.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as SeedPokemon[];
  return data;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const service = app.get(PokemonService);
    const currentCount = await service.countAll();
    if (currentCount >= 30) {
      console.log(
        `Ya existen ${currentCount} Pokémon en la base de datos. Seed omitido.`,
      );
    } else {
      const seeds = await readSeedsFromFile();
      await service.seed(seeds);
      console.log('Seed data inserted successfully desde archivo local');
    }
  } catch (error) {
    console.error('Failed to seed data', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
