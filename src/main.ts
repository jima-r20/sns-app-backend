import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  if (process.env.NODE_ENV === 'development') {
    app
      .enableCors
      //   {
      //   origin: '*',
      //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
      // }
      ();
  }
  // else {
  //   app.enableCors({ origin: serverConfig.origin });
  // }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
