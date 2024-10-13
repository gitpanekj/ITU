import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { QuizQuestion } from "./quiz-question.entity"

@Entity()
export class QuestionAnswer {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    answer: string

    @Column({default: 0})
    numberOfAnswers: number

    @Column()
    questionId: number
    /* End Attributes */

    /* Relations */
    @ManyToOne(() => QuizQuestion, (question) => question.answers, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'questionId'})
    question: QuizQuestion

    @OneToOne(() => QuizQuestion, (question) => question.rightAnswer, {onDelete: 'CASCADE'})
    right_answer_of: QuizQuestion

    /* End of Relations */
}