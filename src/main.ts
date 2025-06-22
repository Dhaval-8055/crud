import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  console.info("Project Running on",process.env.PORT)
}

bootstrap().catch((err) => {
  console.error("Error bootstraping the app ", err);
});
