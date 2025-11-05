import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string): string {
    console.log(`Calling Weather API at ${apiUrl} with key ${apiKey}`);
    console.log(apiUrl, apiKey);
    return 'Sunny, 25°C';
  }
}
