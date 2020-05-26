import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Authors from './Authors';
import Category from './Category';

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

  @OneToOne(() => Authors)
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
