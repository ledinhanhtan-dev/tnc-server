import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'Password must contain at least one uppercase character',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'Password must contain at least one digit number',
  })
  password: string;
}
