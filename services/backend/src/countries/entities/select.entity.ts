import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

@Entity()
export class SelectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'jsonb', nullable: false })
    data: string[];

    @AfterLoad()
    setDefaultData() {
        if (!this.data) {
            this.data = [];
        }
    }
}
