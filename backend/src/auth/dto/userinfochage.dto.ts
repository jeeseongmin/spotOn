import { IsOptional, IsString } from "class-validator";

export class UserinfoChangeDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  telNo?:    string;

  @IsOptional()
  @IsString()
  cpsCd?:    string;    // "PTK";

  @IsOptional()
  @IsString()
  cmtCd?:    string;    // "FAITH";

  @IsOptional()
  @IsString()
  garCd?:    string;    // "MATTHEW";

  @IsOptional()
  @IsString()
  leafCd?:   string;   // "MATTHEW_01";

  @IsOptional()
  @IsString()
  email?:    string;

  @IsOptional()
  @IsString()
  roleId?:   string;   // ex)LEADER
}