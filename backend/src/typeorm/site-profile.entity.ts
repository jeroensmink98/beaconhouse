import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Workspace } from "./workspace.entity";

@Entity()
@Unique(['name', 'workspace'])
export class SiteProfile {
    @PrimaryGeneratedColumn('uuid', { name: 'site_profile_id' })
    siteProfileId: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
    })
    url: string;

    @ManyToOne(() => Workspace, workspace => workspace.siteProfiles)
    @JoinColumn({ name: 'workspace_id' })
    workspace: Workspace;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;



}