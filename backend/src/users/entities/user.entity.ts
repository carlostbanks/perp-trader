// backend/src/users/entities/user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  import { IsEmail } from 'class-validator';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ unique: true })
    @IsEmail()
    email: string;
  
    @Column()
    @Exclude({ toPlainOnly: true })
    passwordHash: string;
  
    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    seedPhrase: string;
  
    @Column({ default: false })
    emailVerified: boolean;
  
    @Column({ nullable: true })
    avatarUrl: string;
  
    @Column({ default: 0 })
    reputation: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    // Relationships will be added later
    // @OneToOne(() => Wallet, wallet => wallet.user)
    // wallet: Wallet;
  
    // @OneToMany(() => Order, order => order.user)
    // orders: Order[];
  }