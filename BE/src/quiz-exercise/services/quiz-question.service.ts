import { Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from '../dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from '../dto/update-quiz-question.dto';
import { QuizQuestion } from '../entities/quiz-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion) private quizQuestionRepository: Repository<QuizQuestion>
  ){}
  async create(createQuizQuestionDto: CreateQuizQuestionDto) : Promise<QuizQuestion> {
    const newQuiz = this.quizQuestionRepository.create(createQuizQuestionDto);
    return await this.quizQuestionRepository.save(newQuiz);
  }

  async findAll() : Promise<QuizQuestion[]> {
    return await this.quizQuestionRepository.find();
  }

  async findOne(id: number) : Promise<QuizQuestion> {
    return await this.quizQuestionRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateQuizQuestionDto: UpdateQuizQuestionDto) : Promise<QuizQuestion> {
    let quiz = await this.quizQuestionRepository.findOne({where: {id:id}});
    if (!quiz)
    {
      throw new Error(`QUestion with ID ${id} not found`)
    }

    Object.assign(quiz, updateQuizQuestionDto);
    return await this.quizQuestionRepository.save(quiz);
  }

  async remove(id: number) : Promise<void> {
    await this.quizQuestionRepository.delete(id);
  }
}
