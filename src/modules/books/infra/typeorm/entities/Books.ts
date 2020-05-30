import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Authors from '@modules/authors/infra/typeorm/entities/Authors';
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('books')
class Books {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  author_id: string;

  @ManyToOne(() => Authors, author => author.name)
  @JoinColumn({ name: 'author_id' })
  author: Authors;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  contents: string;

  @Column()
  isbn: string;

  @Column()
  price: number;

  @Column()
  pages: number;

  @Column()
  date_publication: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Books;
