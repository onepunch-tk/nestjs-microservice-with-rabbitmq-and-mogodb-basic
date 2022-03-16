import { Product, ProductDocument } from './product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throws } from 'assert';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  async productCreated(data): Promise<Product> {
    return new this.productModel(data).save();
  }

  async productUpdated(id: number, data): Promise<Product> {
    return this.productModel.findOneAndUpdate({ id }, data, {new: true});;
  }

  async productDeleted(id: number): Promise<void> {
    await this.productModel.deleteOne({ id });
  }
}
