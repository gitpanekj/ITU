import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>
  ) {}
  async create(createTeacherDto: CreateTeacherDto) : Promise<Teacher>{
    const new_teacher = await this.teacherRepository.create(createTeacherDto);
    return await this.teacherRepository.save(new_teacher);
  }

  async findAll() : Promise<Teacher[]>{
    return await this.teacherRepository.find();
  }

  async findOne(id: number) : Promise<Teacher>{
    return await this.teacherRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) : Promise<Teacher>{
    const teacher = await this.teacherRepository.findOne({where: {id:id}});
    if (!teacher)
    {
      throw new Error(`Teacher with ID ${id} not found`);
    }

    Object.assign(teacher, updateTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async remove(id: number) : Promise<void>{
    await this.teacherRepository.delete(id);
  }
}
