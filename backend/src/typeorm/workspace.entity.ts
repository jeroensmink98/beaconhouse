import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}