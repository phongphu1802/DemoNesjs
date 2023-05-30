import { Role } from './../role/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Interest } from 'src/interest/interest.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserRepository.find({
      relations: ['role'],
    });
  }

  async findOne(id: number): Promise<User> {
    return this.UserRepository.findOne({ where: { id }, relations: ['role', 'interest'] });
  }

  async findByUsername(username: string): Promise<User> {
    console.log(username);
    return this.UserRepository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async managementRole(roles: number[]): Promise<Role[]> {
    return await Promise.all(
      roles.map(
        async (uuidRole) =>
          await this.RoleRepository.findOne({
            where: { id: uuidRole },
          }),
      ),
    );
  }

  async create(User: CreateUserDto): Promise<User> {
    let newUser: User;
    const roleForUser: Role[] = [];
    if (User.role) {
      // User.role.map(async (uuidRole) => {
      //   const getRole: Role = await this.RoleRepository.findOne({
      //     where: { id: uuidRole },
      //   });
      //   roleForUser.push(getRole);
      // });
      const roles = await this.managementRole(User.role);
      console.log(roles);
      roleForUser.concat(roles);
    }
    if (roleForUser) {
      newUser = await this.UserRepository.save({
        ...User,
        ...{
          role: roleForUser,
          interest: [],
        },
      });
    }
    return newUser;
  }

  async update(id: number, User: UpdateUserDto): Promise<User> {
    let updateUser: User;
    // Get User Current
    updateUser = {
      ...updateUser,
      ...this.UserRepository.findOne({ where: { id }, relations: ['role', 'interest'] }),
    };

    // Change Role New
    let roleForUser: Role[] = [];
    if (User.role) {
      roleForUser = [...roleForUser, ...(await this.managementRole(User.role))];
    }
    if (roleForUser) {
      updateUser = await this.UserRepository.save({
        ...User,
        ...{
          role: roleForUser,
          interest: updateUser.interest,
        },
      });
    }

    // Change Interest New
    let interestForUser: Interest[] = [];
    if (User.role) {
      interestForUser = [...interestForUser];
    }
    if (interestForUser) {
      updateUser = await this.UserRepository.save({
        ...User,
        ...{
          role: updateUser.role,
          interest: interestForUser,
        },
      });
    }

    await this.UserRepository.update(id, updateUser);
    return this.UserRepository.findOne({ where: { id }, relations: ['role', 'interest'] });
  }

  async delete(id: number): Promise<void> {
    await this.UserRepository.delete(id);
  }
}
