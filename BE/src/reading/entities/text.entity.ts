import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReadingExercise } from "./reading-exercise.entity";


@Entity()
export class Text {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @OneToOne(() => ReadingExercise, (exercise) => exercise.text, {onDelete: "CASCADE"})
    reading_exercise: ReadingExercise
}