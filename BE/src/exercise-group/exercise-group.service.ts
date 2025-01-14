import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (!group)
    {
      throw new BadRequestException('Bad data provided');
    }

    const entity = await this.exerciseGroupRepository.save(group);
    if (!entity) {
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
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
    const group = await this.exerciseGroupRepository.findOne({where: {id:id}});
    if (!group){
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateExerciseGroupDto: UpdateExerciseGroupDto): Promise<ExerciseGroup>{
    let group = await this.exerciseGroupRepository.findOne({where: {id:id}});
    if (!group)
    {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    Object.assign(group, updateExerciseGroupDto);

    const entity =  await this.exerciseGroupRepository.save(group);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void>{
    const result = await this.exerciseGroupRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
