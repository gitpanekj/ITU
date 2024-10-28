import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReadingQuestion } from "./reading-question.entity";
import { ExerciseGroup } from "src/exercise-group/entities/exercise-group.entity";

@Entity()
export class ReadingExercise {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({default: ""})
    description?: string

    @Column()
    groupId: number

    @Column({default: "<p>Text</p>"})
    text?: string;


    @ManyToOne(() => ExerciseGroup, (group) => group.readingExercises, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'groupId'})
    exerciseGroup: ExerciseGroup

    @OneToMany(() => ReadingQuestion, (question) => question.exercise)
    questions: ReadingExercise[]
}
