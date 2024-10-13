import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { QuizExercise } from "./quiz-exercise.entity"
import { TextReference } from "./text-reference.entity"

@Entity()
export class QuizText {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string
    /* End of Attributes */

    /* Relations */
    @OneToOne(() => QuizExercise, (exercise) => exercise.text, {onDelete: 'CASCADE'})
    quiz: QuizExercise

    @OneToMany(() => TextReference, (reference) => reference.text)
    textReference: TextReference
    /* End of Relations */
}