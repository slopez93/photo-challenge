import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { AdvertisementModule } from "src/modules/advertisement/infrastructure/module";
import { ProductModule } from "src/modules/product/infrastructure/module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    AdvertisementModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    RouterModule.register([
      {
        path: "/products",
        module: ProductModule,
      },
    ]),
  ],
})
export class AppModule {}
