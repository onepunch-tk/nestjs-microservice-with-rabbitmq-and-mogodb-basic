import { ProductService } from './product.service';
import { Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Patch('/:id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);

    const updatedProduct = await this.productService.productUpdated(id, {
      likes: ++product.likes,
    });

    console.log(updatedProduct);
    const result = await this.httpService
      .patch(`http://localhost:8000/api/product/${updatedProduct.id}/like`, {
        likes: updatedProduct.likes,
      })
      .subscribe();

    console.log(result);
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    await this.productService.productCreated(product);
  }

  @EventPattern('product_updated')
  async productUpdated(product: any) {
    await this.productService.productUpdated(product.id, product);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.productDeleted(id);
  }
}
