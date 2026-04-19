import {
  BeforeInsert,
  Collection,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { Blog } from "./blog.model";
import { uuidv7 } from "uuidv7";

@Entity()
export class Tag {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs!: Collection<Blog>;

  @CreateDateColumn()
  createdAt!: Date;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
