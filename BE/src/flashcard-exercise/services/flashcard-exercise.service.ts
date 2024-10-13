import { Injectable } from '@nestjs/common';
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
    return await this.flashcardExerciseRepository.save(exercise);
  }

  async findAll(): Promise<FlashcardExercise[]> {
    return await this.flashcardExerciseRepository.find();
  }

  async findOne(id: number): Promise<FlashcardExercise> {
    return await this.flashcardExerciseRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateFlashcardExerciseDto: UpdateFlashcardExerciseDto): Promise<FlashcardExercise> {
    let exercise = await this.flashcardExerciseRepository.findOne({where: {id:id}});
    if (!exercise)
    {
      throw new Error(`Exercise with ID ${id} not found`);
    }

    Object.assign(exercise, updateFlashcardExerciseDto);

    return await this.flashcardExerciseRepository.save(exercise);
  }

  async remove(id: number) : Promise<void>{
    await this.flashcardExerciseRepository.delete(id);
  }
}
