import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProducts(data: CreateProductDto): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async updateProduct(id: number, data): Promise<Product> {
    const entity = await this.getProductById(id);
    
    return this.productRepository.save({...entity, ...data});;
  }

  async deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
