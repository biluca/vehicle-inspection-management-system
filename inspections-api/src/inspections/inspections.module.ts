import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';
import { AdministrationProviderModule } from 'src/data/administration-provider.module';

@Module({
  imports: [AdministrationProviderModule],
  controllers: [InspectionsController],
  providers: [InspectionsService],
})
export class InspectionsModule {}
