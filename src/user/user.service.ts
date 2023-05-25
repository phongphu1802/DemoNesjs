import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserRepository.find({
      relations: ['role'],
    });
  }

  async findOne(id: number): Promise<User> {
    return this.UserRepository.findOne({ where: { id }, relations: ['role'] });
  }

  async findByUsername(username: string): Promise<User> {
    console.log(username);
    return this.UserRepository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async create(User: Partial<User>): Promise<User> {
    const newUser = this.UserRepository.create(User);
    return this.UserRepository.save(newUser);
  }

  async update(id: number, User: Partial<User>): Promise<User> {
    await this.UserRepository.update(id, User);
    return this.UserRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }
}
