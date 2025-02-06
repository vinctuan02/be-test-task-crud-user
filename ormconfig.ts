import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const AppDataSource = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host:  configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/**/*.entity.{ts,js}'], // Point to your entities
    synchronize: true, // Set true for development, false in production
})


// const user = {
//     id: string uuid
//     email: string
//     username: string not null
//     password: string not null
//     phone_number: string not null
//     first_name: string not null
//     last_name: string not null
//     department: string not null
//     positition: string not null
//     role: string not null
//     avatarUrl: string
    
//     otpVerifyEmail
//     otpVerifyEmailExpiresAt: Date
//     isActive: boolean not null default false
//     createAt: Date
//     updateAt: Date
// }


// const order = {
//     id: string uuid not null 
//     product: [video, mp3, image, pdf]
//     description: string 
//     urlResource: string not null
//     createAt: date not null
//     updateAt: date 
//     userId: not null
// }


