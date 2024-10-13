import { ExerciseGroup } from "src/exercise-group/entities/exercise-group.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizText } from "./text.entity";
import { QuizQuestion } from "./quiz-question.entity";

@Entity()
export class QuizExercise {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    groupId: number

    @Column({nullable: true})
    textId: number
    /* End Attributes */

    /* Relations */
    @ManyToOne(() => ExerciseGroup, (group) => group.quizExercises, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'groupId'})
    exerciseGroup: ExerciseGroup


    @OneToMany(() => QuizQuestion, (question) => question.quiz)
    questions: QuizQuestion[]

    @OneToOne(() => QuizText, (text) => text.quiz, {nullable: true})
    @JoinColumn({name: 'textId'})
    text: QuizText

    /* End of Relations */
}