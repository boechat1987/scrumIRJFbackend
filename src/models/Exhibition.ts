import { Entity } from "typeorm";
import { Column } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import {JoinColumn} from "typeorm";
import Image from './Image';

@Entity('exhibitions')
export default class Exhibition {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column({ default: false })
  check: boolean;

  @OneToMany(() => Image, (image) => image.exhibition, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'exhibition_id' })
  images: Image[];
}
