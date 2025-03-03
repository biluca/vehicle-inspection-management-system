import { Module } from '@nestjs/common';
import { AdministrationProviderService } from './administration-provider.service';

@Module({
  providers: [AdministrationProviderService],
  exports: [AdministrationProviderService],
})
export class AdministrationProviderModule {}
