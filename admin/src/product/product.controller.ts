import { UpdatedProductDto } from './dtos/updated-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProducts(@Body() productDto: CreateProductDto) {
    const product = await this.productService.createProducts(productDto);

    this.client.emit('product_created', product);

    return product;
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdatedProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );

    this.client.emit('product_updated', updatedProduct);

    return updatedProduct;
  }
  @Patch('/:id/like')
  async updateProductLike(
    @Param('id') id: number,
    @Body() updateProductDto: UpdatedProductDto,
  ) {
    console.log(id, updateProductDto);
    
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);

    this.client.emit('product_deleted', id);
  }
}
