import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Site {
    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "site_id"
    })
    siteId: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    url: string;

}