import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CountriesEntity {
    @PrimaryGeneratedColumn()
    id_inn: number;

    @Column()
    id: number;

    @Column()
    currency: string;

    @Column()
    alphabeticCode: string;

    @Column()
    numericCode: string;

    @Column()
    entity: string;

    @Column()
    haveInUn: string;

}
