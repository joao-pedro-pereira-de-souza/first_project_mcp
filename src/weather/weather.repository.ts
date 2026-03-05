import axios, { AxiosInstance } from "axios";
import currentResponseJSON from "../../mock/weather/requests/realtime.json" with { type: "json" };

export class WeatherRepository {
  static instance: WeatherRepository;

  constructor(private readonly axiosInstance: AxiosInstance) {}

  static getInstance() {
    if (!this.instance) {
      const axiosBase = axios.create({
        baseURL: String(process.env.WEATHER_BASE_URL),
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.instance = new WeatherRepository(axiosBase);
      return this.instance;
    }

    return this.instance;
  }

  async getCurrentWeather(location: string) {
    try {
      const envMock = ["development", "test"];
      if (envMock.includes(process.env.NODE_ENV || "")) {
        return currentResponseJSON;
      }

      const response = await this.axiosInstance.get("/current.json", {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: location,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Failed to fetch weather data");
    }
  }
}
