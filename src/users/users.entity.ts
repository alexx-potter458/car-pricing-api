import { Report } from 'src/reports/reports.entity';
import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log("Inserted User with Id ", this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated User with Id ", this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed User with Id ", this.id);
    }
}