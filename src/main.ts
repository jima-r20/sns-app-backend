import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const serverConfig = config.get('server')

  if (process.env.NODE_ENV === 'development') {
    app.enableCors(
    //   {
    //   origin: '*',
    //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    // }
    );
  } 
  // else {
  //   app.enableCors({ origin: serverConfig.origin });
  // }

  await app.listen(3000);
}
bootstrap();
