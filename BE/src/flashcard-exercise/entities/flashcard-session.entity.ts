import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FlashcardSession {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    exerciseId: number

    @Column({default: 0})
    flashcardId: number

    @Column()
    total: number

    @Column({default: 0})
    counter: number

    @Column({default: ""})
    markedAsHard: string

    @Column({default: ""})
    historyHard: string
}