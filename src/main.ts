import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "body-parser";
import { config } from "dotenv";
import { AppModule } from "./app.module";
config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: true, cors: true });
    const port = Number(process.env.APP_PORT) || 3000;

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.setGlobalPrefix("api");
    app.disable("x-powered-by");
    app.enableCors();
    app.use(urlencoded({ extended: true }));
    app.use(json({ limit: "5mb" }));

    const swaggerOptions = new DocumentBuilder()
        .setTitle("API Swagger")
        .setDescription("Swagger documentation of Agreena")
        .setVersion("1.0")
        .addBearerAuth({ type: "http", name: "authorization", in: "header", scheme: "bearer", bearerFormat: "JWT" })
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup("/api/docs", app, swaggerDocument);

    await app.listen(port);

    console.log(`Listening on port: ${port}`);
    console.log(`Explore api on http://localhost:${port}/api/docs`);
}

bootstrap();
