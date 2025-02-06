import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API Docs for MyApp')
        .setVersion('1.0')
        .addBearerAuth() // Thêm xác thực bằng Bearer Token
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
