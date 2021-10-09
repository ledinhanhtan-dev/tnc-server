import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Tag, tag => tag.filter)
  tags: Tag[];

  @ManyToOne(() => Category, category => category.filters)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
