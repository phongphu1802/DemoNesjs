import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<any> {
    return this.RoleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.RoleRepository.findOne({ where: { id } });
  }

  async create(Role: Partial<Role>): Promise<Role> {
    const newRole = this.RoleRepository.create(Role);
    return this.RoleRepository.save(newRole);
  }

  async update(id: number, Role: Partial<Role>): Promise<Role> {
    await this.RoleRepository.update(id, Role);
    return this.RoleRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.RoleRepository.delete(id);
  }

  async findByName(name: string): Promise<Role> {
    return this.RoleRepository.findOneOrFail({
      where: {
        name,
      },
    });
  }
}
