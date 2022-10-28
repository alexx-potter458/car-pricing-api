import { 
    IsString, 
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude
} from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(1)
    @Max(1000000)
    price: number;

    @IsString()
    make: string;
    
    @IsString()
    model: string;

    @IsNumber()
    @IsLongitude()
    lng: number;
    
    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(1930)
    @Max(2025)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}