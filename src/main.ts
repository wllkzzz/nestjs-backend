import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


async function start() {
    const PORT = process.env.SERVER_PORT || 3000;
    const app = await NestFactory.create(AppModule)

    await app.listen(PORT, () => {
        console.log("Server has been started on PORT: " + PORT)
    })
}


start()