import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cities'})
export class City {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column()
    state:string;

    @Column()
    population:number;

}
