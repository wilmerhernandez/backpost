import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NetsolutionsResolver } from './adapters/controllers/netsolutions/netsolutions.resolver';
import { CountriesService } from './dominio/countries/countries/countries.service';
import { DominioModule } from './dominio/dominio.module';
import { NetsolutionsModule } from './adapters/controllers/netsolutions/netsolutions.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground:true,
      plugins:[]
    }),
    NetsolutionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
