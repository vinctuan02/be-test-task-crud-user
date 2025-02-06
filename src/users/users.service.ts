import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPasswordFunc } from 'src/helper/password.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // check email, username, phonenumber

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    // hashpassword
    const hashedPassword = await hashPasswordFunc(password);

    // save
    const userSaved = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    return plainToInstance(User, userSaved);
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return plainToInstance(User, allUsers);
  }

  async findOne(id: string): Promise<User> {
    const userById = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(User, userById);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password']
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email } = updateUserDto;

    const userById = await this.userRepository.findOne({ where: { id } });
    if (!userById) throw new NotFoundException('User not found');

    // kiểm tra email đã được dùng hay chưa
    if (email) {
      const userByEmail = await this.userRepository.findOne({
        where: { email },
      });

      if (userByEmail && userByEmail.id !== id) {
        throw new BadRequestException('Email is already in use.');
      }
    }

    Object.assign(userById, updateUserDto);

    const userSaved = await this.userRepository.save(userById);
    return plainToInstance(User, userSaved);
  }

  async remove(id: string): Promise<string> {
    const userById = await this.userRepository.findOne({ where: { id } });
    if (!userById) throw new NotFoundException(`User with ID: ${id} not found`);
    await this.userRepository.delete(id);

    return `User ${id} has been deleted successfully`;
  }
}
