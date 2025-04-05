  // backend/src/markets/dto/update-market.dto.ts
  import { PartialType } from '@nestjs/swagger';
  import { CreateMarketDto } from './create-market.dto';
  
  export class UpdateMarketDto extends PartialType(CreateMarketDto) {}
  