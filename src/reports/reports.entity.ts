import { User } from '../users/users.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    year: number;
    
    @Column({name: 'kmage'})
    mileage: number;

    @Column({ default: false })
    approved: boolean;

    @ManyToOne(() => User, (user)=> user.reports)
    user: User;
}