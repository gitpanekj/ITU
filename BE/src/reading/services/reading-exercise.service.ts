import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingExercise } from '../entities/reading-exercise.entity';
import { CreateReadingExerciseDto } from '../dto/create-reading-exercise.dto';
import { UpdateReadingExerciseDto } from '../dto/update-reading-exercise.dto';

@Injectable()
export class ReadingExerciseService {
  constructor(
    @InjectRepository(ReadingExercise)
    private readingExerciseRepository: Repository<ReadingExercise>,
  ) {}
  async create(
    dto: CreateReadingExerciseDto,
  ): Promise<ReadingExercise> {
    const reading = this.readingExerciseRepository.create(dto);
    if (!reading){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.readingExerciseRepository.save(reading);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: ReadingExercise[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.readingExerciseRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ReadingExercise> {
    const reading = await this.readingExerciseRepository.findOne({ where: { id: id } });
    if (!reading){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return reading;
  }

  async update(
    id: number,
    dto: UpdateReadingExerciseDto,
  ): Promise<ReadingExercise> {
    let reading = await this.readingExerciseRepository.findOne({ where: { id: id } });
    if (!reading) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(reading, dto);
    const entity = await this.readingExerciseRepository.save(reading);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.readingExerciseRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
