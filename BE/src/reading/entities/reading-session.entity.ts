import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReadingSession {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    exerciseId: number

    @Column({default: 0})
    questionIdx: number

    @Column()
    total: number

    @Column({default: ""})
    correct?: string; // {idx, name}

    @Column({default: ""})
    wrong?: string;   // {idx, name, chosen}
}