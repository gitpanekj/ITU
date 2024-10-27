import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { ReadingQuestion } from '../entities/reading-question.entity';


@Injectable()
export class ReadingQuestionService {
  constructor(
    @InjectRepository(ReadingQuestion)
    private readingQuestionRepository: Repository<ReadingQuestion>,
  ) {}
  async create(
    dto: CreateQuestionDto,
  ): Promise<ReadingQuestion> {
    const question = this.readingQuestionRepository.create(dto);
    if (!question){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.readingQuestionRepository.save(question);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters?: Record<string, string>;
    order?: Record<string, string>;
  }): Promise<{ data: ReadingQuestion[]; total: number }> {
    const { page, limit, filters, order} = params;

    const [data, total] = await this.readingQuestionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: order
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ReadingQuestion> {
    const question = await this.readingQuestionRepository.findOne({ where: { id: id } });
    if (!question){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return question;
  }

  async update(
    id: number,
    dto: UpdateQuestionDto,
  ): Promise<ReadingQuestion> {
    let question = await this.readingQuestionRepository.findOne({ where: { id: id } });
    if (!question) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(question, dto);
    const entity = await this.readingQuestionRepository.save(question);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.readingQuestionRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
