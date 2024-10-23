import { ExerciseGroup } from "src/exercise-group/entities/exercise-group.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlashCard } from "./flashcard.entity";

@Entity()
export class FlashcardExercise {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: ""})
    description: string


    @Column()
    groupId: number
    /* End of Attributes */

    /* Relations */
    @ManyToOne(() => ExerciseGroup, (group) => group.flashcardExercises, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'groupId'})
    exerciseGroup: ExerciseGroup

    @OneToMany(() => FlashCard, (flashcard) => flashcard.flashcardExercise)
    flashcards: FlashCard[]
    /* End of Relations */
}
