import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NetsolutionsModule } from './adapters/controllers/netsolutions/netsolutions.module';
import { ResourcesModule } from './adapters/controllers/resources/resources.module';
import { DominioModule } from './dominio/dominio.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:true,
      plugins:[]
    }),
    NetsolutionsModule,
    ResourcesModule,
    DominioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
