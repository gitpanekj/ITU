import { FlashcardExercise } from "src/flashcard-exercise/entities/flashcard-exercise.entity";
import { QuizExercise } from "src/quiz-exercise/entities/quiz-exercise.entity";
import { ReadingExercise } from "src/reading/entities/reading-exercise.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExerciseGroup {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    teacherId: number
    /* End of Attributes */

    /* Relations */
    @ManyToOne(() => Teacher, (teacher) => teacher.exerciseGroups, {onDelete: 'CASCADE'})
    @JoinColumn({name:'teacherId'})
    teacher: Teacher

    @OneToMany(() => FlashcardExercise, (exercise) => exercise.exerciseGroup)
    flashcardExercises: FlashcardExercise[]

    @OneToMany(() => QuizExercise, (exercise) => exercise.exerciseGroup)
    quizExercises: QuizExercise[]

    @OneToMany(() => ReadingExercise, (exercise) => exercise.exerciseGroup)
    readingExercises: ReadingExercise[]
    /* End of Relations */


}
