import { ExerciseGroup } from "src/exercise-group/entities/exercise-group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    /* Attributes */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string
    /* End of Attributes */

    /* Relations */
    @OneToMany(() => ExerciseGroup, (group) => group.teacher)
    exerciseGroups: ExerciseGroup[]
    /* End of Relations */
}