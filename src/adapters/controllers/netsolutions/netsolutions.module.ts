import { Module } from '@nestjs/common';
import { NetsolutionsResolver } from './netsolutions.resolver';

@Module({
  providers: [NetsolutionsResolver]
})
export class NetsolutionsModule {}
