import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { QuestionAnswer } from "./question-answer.entity"
import { QuizExercise } from "./quiz-exercise.entity"

@Entity()
export class QuizQuestion {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column({default: ""})
    name: string

    // statistics
    @Column({default: 0})
    noCorrect: number
    @Column({default: 0})
    noWrong: number
    @Column({default: 0})
    hardCount: number


    @Column()
    quizId: number

    @Column({nullable: true})
    rightAnswerId: number

    /* End Attributes */

    /* Relations */
    @ManyToOne(() => QuizExercise, (exercise) => exercise.questions, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'quizId'})
    quiz: QuizExercise

    @OneToMany(() => QuestionAnswer, (answer) => answer.question)
    answers: QuestionAnswer[]

    @OneToOne(() => QuestionAnswer, (answer) => answer.right_answer_of, {nullable: true})
    @JoinColumn({name:'rightAnswerId'})
    rightAnswer: QuestionAnswer
    
    /* End of Relations */
}