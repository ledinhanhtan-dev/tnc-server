import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { FilterModule } from './filter/filter.module';
import { CommonModule } from './common/common.module';
import { BrandsModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    CommonModule,
    BrandsModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    CartModule,
    TagModule,
    FilterModule,
  ],
  providers: [],
})
export class AppModule {}
