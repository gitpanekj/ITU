import { Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseGroup } from './entities/exercise-group.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ExerciseGroupService {
  constructor(
    @InjectRepository(ExerciseGroup) private exerciseGroupRepository : Repository<ExerciseGroup>
  ) {}
  async create(createExerciseGroupDto: CreateExerciseGroupDto): Promise<ExerciseGroup>{
    const group = this.exerciseGroupRepository.create(createExerciseGroupDto);
    return await this.exerciseGroupRepository.save(group);
  }

  async findAll(params: {page: number, limit: number, filters: Record<string, string>}): Promise<{data:ExerciseGroup[], total: number}>{
    const {page, limit, filters} = params;

    const [data, total] = await this.exerciseGroupRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit
    });

    return {data, total};
  }

  async findOne(id: number): Promise<ExerciseGroup>{
    return await this.exerciseGroupRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateExerciseGroupDto: UpdateExerciseGroupDto): Promise<ExerciseGroup>{
    let group = await this.exerciseGroupRepository.findOne({where: {id:id}});
    if (!group)
    {
      throw new Error(`Group with ID ${id} not found`);
    }
    Object.assign(group, updateExerciseGroupDto);

    return await this.exerciseGroupRepository.save(group);
  }

  async remove(id: number): Promise<void>{
    await this.exerciseGroupRepository.delete(id);
  }
}
