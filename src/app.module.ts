import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
// import { Blog, BlogSchema } from './blog.schema';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';

console.log('env: ' + process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config], // custom configuration file
      cache: true,
      expandVariables: true,
    }),
    WeatherModule,
    UserModule,
    // MongooseModule.forRoot(
    //     'mongodb://localhost/nestjs-blog-tutorial',
    // ),
    // MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
