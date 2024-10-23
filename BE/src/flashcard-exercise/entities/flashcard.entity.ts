import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { FlashcardExercise } from "./flashcard-exercise.entity"

@Entity()
export class FlashCard {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    frontFace: string

    @Column()
    backFace: string

    @Column({default: 0})
    hardCount: number

    @Column({default: ""})
    feedback: string

    @Column()
    flashcardExerciseId: number
    /* End of Attributes */

    /* Relations */
    @ManyToOne(() => FlashcardExercise, (exercise) => exercise.flashcards, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'flashcardExerciseId'})
    flashcardExercise: FlashcardExercise

    /* End of Relations */
}