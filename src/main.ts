import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar csurf middleware
  app.use(csurf(), cors<cors.CorsRequest>({ origin: ['https://backpost-v1jb.onrender.com', 'https://studio.apollographql.com'] }),);

  await app.listen(3000);
}
bootstrap();
