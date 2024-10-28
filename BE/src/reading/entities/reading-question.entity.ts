import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReadingExercise } from "./reading-exercise.entity";

@Entity()
export class ReadingQuestion {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    question: string

    @Column()
    answer: string

    @Column()
    exerciseId: number

    @Column({default: false})
    textAttached: boolean

    // statistics
    @Column({default: 0})
    noCorrect: number
    @Column({default: 0})
    noWrong: number
    @Column({default: 0})
    hardCount: number


    @ManyToOne(() => ReadingExercise, (exercise) => exercise.questions, {onDelete: "CASCADE"})
    @JoinColumn({name: 'exerciseId'})
    exercise: ReadingExercise

}
