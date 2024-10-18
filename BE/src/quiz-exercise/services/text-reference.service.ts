import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTextReferenceDto } from '../dto/create-text-reference.dto';
import { UpdateTextReferenceDto } from '../dto/update-text-reference.dto';
import { TextReference } from '../entities/text-reference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { text } from 'stream/consumers';

@Injectable()
export class TextReferenceService {
  constructor(
    @InjectRepository(TextReference)
    private textReferenceRepository: Repository<TextReference>,
  ) {}

  async create(createTextReferenceDto: CreateTextReferenceDto): Promise<TextReference> {
    const newQuiz = this.textReferenceRepository.create(createTextReferenceDto);
    if (!newQuiz){
      throw new BadRequestException('Bad data provided');
    }

    const entity = await this.textReferenceRepository.save(newQuiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{data: TextReference[], total: number}> {
    const { page, limit, filters } = params;

    const [data, total] = await this.textReferenceRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<TextReference> {
    const textReference = await this.textReferenceRepository.findOne({ where: { id: id } });
    if (!textReference){
      throw new NotFoundException(`textReference with ID ${id} not found`);
    }
    return textReference;
  }

  async update(
    id: number,
    updateTextReferenceDto: UpdateTextReferenceDto,
  ): Promise<TextReference> {
    let quiz = await this.textReferenceRepository.findOne({ where: { id: id } });
    if (!quiz) {
      throw new NotFoundException(`QUestion with ID ${id} not found`);
    }

    Object.assign(quiz, updateTextReferenceDto);
    const entity = await this.textReferenceRepository.save(quiz);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.textReferenceRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the entity');
    }
  }
}
