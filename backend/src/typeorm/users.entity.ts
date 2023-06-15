import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Workspace } from "./workspace.entity";

@Entity()
export class User {
    @PrimaryColumn(('uuid'))
    userId: string;

    @Column({
        nullable: false,
    })
    firstName: string;

    @Column(
        { nullable: false }
    )
    lastName: string;

    @Column({
        nullable: false,
        unique: true,
    })
    userEmail: string;

    @Column({
        nullable: false,
    })
    userPassword: string;

    @ManyToOne(() => Workspace, workspace => workspace.users, { nullable: false })
    workspace: Workspace;


}