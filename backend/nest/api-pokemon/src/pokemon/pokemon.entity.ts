import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pokemon' })
export class Pokemon {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'sprite_default' })
  spriteDefault: string;

  @Column({ name: 'sprite_artwork' })
  spriteArtwork: string;

  @Column({ type: 'jsonb' })
  types: string[];

  @Column({ name: 'height_m', type: 'real' })
  heightM: number;

  @Column({ name: 'weight_kg', type: 'real' })
  weightKg: number;

  @Column({ type: 'jsonb' })
  stats: Record<string, number>;
}
