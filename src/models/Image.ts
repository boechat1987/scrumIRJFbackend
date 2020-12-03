import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,} from 'typeorm';

import Exhibition from './Exhibition';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;
  
  @ManyToOne(() => Exhibition, (exhibition) => exhibition.images)
  @JoinColumn({ name: 'exhibition_id' })
  exhibition: Exhibition;
}
