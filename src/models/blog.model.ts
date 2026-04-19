import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { uuidv7 } from "uuidv7";
import { Tag } from "./tag.model";

@Entity()
export class Blog {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  category!: string;

  @Column()
  author!: string;

  @ManyToMany(() => Tag, (tag) => tag.blogs, { cascade: true })
  @JoinTable()
  tags!: Tag[];

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
