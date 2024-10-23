import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlashcardSession } from '../entities/flashcard-session.entity';
import { CreateFlashcardSessionDto } from '../dto/create-session.dto';
import { UpdateFlashcardSessionDto } from '../dto/update-session.dto';


@Injectable()
export class FlashcardSessionService {
  constructor(
    @InjectRepository(FlashcardSession)
    private flashcardSessionRepository: Repository<FlashcardSession>,
  ) {}
  async create(
    dto: CreateFlashcardSessionDto,
  ): Promise<FlashcardSession> {
    const session = this.flashcardSessionRepository.create(dto);
    if (!session){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.flashcardSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: FlashcardSession[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.flashcardSessionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<FlashcardSession> {
    const session = await this.flashcardSessionRepository.findOne({ where: { id: id } });
    if (!session){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: number,
    dto: UpdateFlashcardSessionDto,
  ): Promise<FlashcardSession> {
    let session = await this.flashcardSessionRepository.findOne({ where: { id: id } });
    if (!session) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(session, dto);
    const entity = await this.flashcardSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.flashcardSessionRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
