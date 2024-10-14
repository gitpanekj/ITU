import { Injectable } from '@nestjs/common';
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
    return await this.quizExerciseRepository.save(newQuiz);
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
    return await this.quizExerciseRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateQuizExerciseDto: UpdateQuizExerciseDto,
  ): Promise<QuizExercise> {
    let quiz = await this.quizExerciseRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new Error(`Quiz with ID ${id} not found`);
    }

    Object.assign(quiz, updateQuizExerciseDto);
    return await this.quizExerciseRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    await this.quizExerciseRepository.delete(id);
  }
}
