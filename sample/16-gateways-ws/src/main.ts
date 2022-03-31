import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    // ssl certs that are in sample/16-gateways-ws/certs
    key: fs.readFileSync('certs/privkey.pem'),
    cert: fs.readFileSync('certs/fullchain.pem'),
  };

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
