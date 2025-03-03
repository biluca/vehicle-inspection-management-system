import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { InspectionsModule } from 'src/inspections/inspections.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    InspectionsModule,
    VehiclesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
