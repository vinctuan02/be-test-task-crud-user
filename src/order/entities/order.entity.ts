import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {

  @Column({ type: 'varchar', nullable: false })
  productName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  urlResource: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;
}
