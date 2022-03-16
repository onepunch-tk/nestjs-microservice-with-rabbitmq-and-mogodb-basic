import { IsOptional } from "class-validator";

export class UpdatedProductDto { 
  
  @IsOptional()
  title: string;
  
  @IsOptional()
  image: string;
  
  @IsOptional()
  likes: number;
}