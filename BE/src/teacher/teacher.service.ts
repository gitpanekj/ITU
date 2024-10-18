import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const new_teacher = this.teacherRepository.create(createTeacherDto);
    if (!new_teacher){
      throw new BadRequestException('Bad data provided');
    }
    const entity = await this.teacherRepository.save(new_teacher);
    if (!entity)
    {
      throw new ConflictException('Failed to save the entity');
    }

    return entity;
  }

  async findAll(params: {
    page: number;
    limit: number;
    filters: Record<string, string>;
  }): Promise<{ data: Teacher[]; total: number }> {
    const { page, limit, filters } = params;

    const [data, total] = await this.teacherRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {data, total};
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id: id } });
    if (!teacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
    return teacher;
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id: id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    Object.assign(teacher, updateTeacherDto);
    const entity = await this.teacherRepository.save(teacher);
    if (!entity)
    {
    throw new ConflictException('Failed to save the entity');
    }
    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.teacherRepository.delete(id);
    if (result.affected === 0) {
      throw new ConflictException('Failed to delete the record');
    }
  }
}
