import { WeatherRepository } from "./weather.repository.js";
import { ResponseCurretJson } from './dto/get.request.weather.dto.js';

export class WeatherServer {
  private readonly weatherRepository: WeatherRepository;

  constructor() {
    this.weatherRepository = WeatherRepository.getInstance();
  }

  async getCurrentWeather(location: string)  {
    try {
      const weatherData = await this.weatherRepository.getCurrentWeather(location);
      return weatherData ? (weatherData as ResponseCurretJson) : null;

    } catch (error) {
      return {
        error: true,
        message: `
          Failed to get current weather

          details: ${error instanceof Error ? error.message : String(error)}
        `,
      };
    }
  }
}
