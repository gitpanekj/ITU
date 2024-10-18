import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizExerciseDto } from '../dto/create-quiz-exercise.dto';
import { UpdateQuizExerciseDto } from '../dto/update-quiz-exercise.dto';
import { QuizExercise } from '../entities/quiz-exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizExerciseService {
  constructor(
    @InjectRepository(QuizExercise)
    private quizExerciseRepository: Repository<QuizExercise>,
  ) {}
  async create(
    createQuizExerciseDto: CreateQuizExerciseDto,
  ): Promise<QuizExercise> {
    const newQuiz = this.quizExerciseRepository.create(createQuizExerciseDto);
    if (!newQuiz){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.quizExerciseRepository.save(newQuiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: QuizExercise[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.quizExerciseRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<QuizExercise> {
    const quiz = await this.quizExerciseRepository.findOne({ where: { id: id } });
    if (!quiz){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async update(
    id: number,
    updateQuizExerciseDto: UpdateQuizExerciseDto,
  ): Promise<QuizExercise> {
    let quiz = await this.quizExerciseRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuizExerciseDto);
    const entity = await this.quizExerciseRepository.save(quiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.quizExerciseRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
