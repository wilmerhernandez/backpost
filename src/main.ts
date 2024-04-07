import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'; // Cambiado a importar todo como cors

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Middleware para agregar Apollo-Require-Preflight: 'true' si no está presente
    app.use((req, res, next) => {
      if (!req.headers['Content-Type']) {
        req.headers['Content-Type'] = 'application/json';
      }
      next();
    });

  // Configurar CORS con opciones específicas
  app.use(cors({
    origin: ['https://backpost-v1jb.onrender.com', 'https://studio.apollographql.com'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-apollo-operation-name', 'apollo-require-preflight'],
    credentials: true, // Permite el envío de cookies de origen cruzado
  }));

  await app.listen(3000);
}
bootstrap();
