import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    IsBoolean,
} from 'class-validator';


export class UpdateUserDto {
    @IsString()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    dob: Date;

    @IsString()
    position: string;

    @IsBoolean()
    isDeleted: boolean;

    @IsString()
    personalEmail: string;

    @IsString()
    profilePhotoKey: string;

}
