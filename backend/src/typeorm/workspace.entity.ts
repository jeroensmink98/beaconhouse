import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SiteProfile } from "./site-profile.entity";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn('uuid', { name: 'workspace_id' })
    workspaceId: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
        length: 50,
    })
    organization: string;

    @OneToMany(() => SiteProfile, siteProfile => siteProfile.workspace)
    siteProfiles: SiteProfile[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}