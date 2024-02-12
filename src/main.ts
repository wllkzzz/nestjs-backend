import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function start() {
    const PORT = process.env.SERVER_PORT || 3000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
    .setTitle("REST API")
    .setDescription("REST API using NestJS")
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
        console.log("Server has been started on PORT: " + PORT)
    })
}


start()