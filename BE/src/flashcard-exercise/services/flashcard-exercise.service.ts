import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlashcardExerciseDto } from '../dto/create-flashcard-exercise.dto';
import { UpdateFlashcardExerciseDto } from '../dto/update-flashcard-exercise.dto';
import { FlashcardExercise } from '../entities/flashcard-exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FlashcardExerciseService {
  constructor(
    @InjectRepository(FlashcardExercise) private flashcardExerciseRepository: Repository<FlashcardExercise>
  ){}
  async create(createFlashcardExerciseDto: CreateFlashcardExerciseDto) {
    const exercise = this.flashcardExerciseRepository.create(createFlashcardExerciseDto);
    if (!exercise){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.flashcardExerciseRepository.save(exercise);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {page: number, limit: number, filters: Record<string, string>}): Promise<{data: FlashcardExercise[], total: number}> {
    const {page, limit, filters} = params;

    const [data, total] = await this.flashcardExerciseRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit
    });

    return {data, total};
  }

  async findOne(id: number): Promise<FlashcardExercise> {
    const flash_card = await this.flashcardExerciseRepository.findOne({where: {id:id}});
    if (!flash_card) throw new Error(`Exercise with ID ${id} not found`)
    return flash_card;
  }

  async update(id: number, updateFlashcardExerciseDto: UpdateFlashcardExerciseDto): Promise<FlashcardExercise> {
    let exercise = await this.flashcardExerciseRepository.findOne({where: {id:id}});
    if (!exercise)
    {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    Object.assign(exercise, updateFlashcardExerciseDto);

    const entity =  await this.flashcardExerciseRepository.save(exercise);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number) : Promise<void>{
    const result = await this.flashcardExerciseRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
