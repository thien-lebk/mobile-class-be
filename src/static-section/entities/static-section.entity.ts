import { StaticItem } from 'src/static-item/entities/static-item.entity';
import { StaticSite } from 'src/static-site/entities/static-site.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'static_section', schema: 'public' })
export class StaticSection extends BaseEntity {
  constructor(partial: Partial<StaticSection>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  isDeleted: boolean;

  @ManyToMany(() => StaticItem)
  @JoinTable({
    name: 'static_tables_relation',
    joinColumn: { name: 'section_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' },
  })
  staticItemList: StaticItem[];

  @ManyToMany(() => StaticSite)
  staticSiteList: StaticSite[];

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
