import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Site {
    @PrimaryGeneratedColumn('uuid')
    siteId: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    url: string;

}