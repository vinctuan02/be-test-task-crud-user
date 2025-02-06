import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ nullable: false, select: false })
  @Exclude()
  password: string;

  @Column({ name: 'phone_number', length: 15, nullable: false })
  phoneNumber: string;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({ length: 100, nullable: false })
  department: string;

  @Column({ length: 100, nullable: false })
  position: string;

  @Column({ length: 50, default: 'staff', nullable: false })
  role: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'otp_verify_email', nullable: true })
  otpVerifyEmail: string;

  @Column({ name: 'otp_verify_email_expires_at', type: 'timestamp', nullable: true })
  otpVerifyEmailExpiresAt: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}