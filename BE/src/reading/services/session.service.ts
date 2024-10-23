import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingSession } from '../entities/reading-session.entity';
import { CreateReadingSessionDto } from '../dto/create-reading-session.dto';
import { UpdateReadingSessionDto } from '../dto/update-reading-session.dto';


@Injectable()
export class ReadingSessionService {
  constructor(
    @InjectRepository(ReadingSession)
    private readingSessionRepository: Repository<ReadingSession>,
  ) {}
  async create(
    dto: CreateReadingSessionDto,
  ): Promise<ReadingSession> {
    const session = this.readingSessionRepository.create(dto);
    if (!session){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.readingSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: ReadingSession[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.readingSessionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ReadingSession> {
    const session = await this.readingSessionRepository.findOne({ where: { id: id } });
    if (!session){
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: number,
    dto: UpdateReadingSessionDto,
  ): Promise<ReadingSession> {
    let session = await this.readingSessionRepository.findOne({ where: { id: id } });
    if (!session) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    Object.assign(session, dto);
    const entity = await this.readingSessionRepository.save(session);
    if (!entity){
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.readingSessionRepository.delete(id);
    if (result.affected === 0){
      throw new ConflictException('Failed to delete the record');
    }
  }
}
