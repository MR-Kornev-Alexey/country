import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SelectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "jsonb", nullable: false })
    data: string[]; // Массив строк, который будет храниться как JSONB
}
