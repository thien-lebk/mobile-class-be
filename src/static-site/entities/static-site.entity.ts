import { StaticItem } from 'src/static-item/entities/static-item.entity';
import { StaticSection } from 'src/static-section/entities/static-section.entity';
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
export class StaticSite extends BaseEntity {
  constructor(partial: Partial<StaticSite>) {
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

  @ManyToMany(() => StaticSection)
  @JoinTable({
    name: 'static_tables_relation',
    joinColumn: { name: 'site_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'section_id', referencedColumnName: 'id' },
  })
  staticSectionList: StaticSection[];

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
