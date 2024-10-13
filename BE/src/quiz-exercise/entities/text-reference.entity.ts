import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuizText } from "./text.entity";
import { QuizQuestion } from "./quiz-question.entity";

@Entity()
export class TextReference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  referenceId: number;

  @Column()
  textId: number;

  @Column()
  questionId: number;

  @ManyToOne(() => QuizText, (text) => text.textReference, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'textId' })
  text: QuizText;

  @OneToOne(() => QuizQuestion, (answer) => answer.textReference, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'questionId'})
  question: QuizQuestion;
}
