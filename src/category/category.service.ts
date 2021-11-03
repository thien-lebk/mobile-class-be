import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  async updateCategory(
    transactionManager: EntityManager,
    updateCategoryDto: UpdateCategoryDto,
    id: number,
  ): Promise<unknown> {
    await this.categoryRepository.updateCategory(
      transactionManager,
      updateCategoryDto,
      id
    );

    return { statusCode: 201, message: 'Tạo Category thành công.' };
  }
  constructor(private categoryRepository: CategoryRepository) {}
  getAll(transactionManager: EntityManager): Promise<unknown> {
    return this.categoryRepository.getAllCatalogue(transactionManager);
  }

  async createCategory(
    transactionManager: EntityManager,
    createCategoryDto: CreateCategoryDto,
  ): Promise<unknown> {
    await this.categoryRepository.createCategory(
      transactionManager,
      createCategoryDto,
    );

    return { statusCode: 201, message: 'Tạo Category thành công.' };
  }
}
