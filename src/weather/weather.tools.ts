import { RegisterToolDto } from "../utils/dto/tolls.dto.js";
import { z } from "zod";
import { WeatherServer } from './weather.server.js'

const tools: RegisterToolDto[] = [
  {
    name: "get_current_weather",
    options: {
      title: "Get Current Weather",
      description: "Fetches the current weather for a specified location.",
      inputSchema: z.object({
        location: z
          .string()
          .describe(
            "The location to get the weather for (e.g., city name, coordinates).",
          ),
      }),
    },
    handler: async (args, extra) => {
      const { location } = args as { location: string };
      const weatherServer = new WeatherServer();
      const weatherData = await weatherServer.getCurrentWeather(location);

      if (!weatherData || !(weatherData as any).location) {
        const { error, message } = weatherData as any;
        return {
          content: [
            {
              type: "text",
              text: `
                Temperature data not found for location: ${location}.

                ${error ? `Error details: ${message}` : "No additional error information available."}

              `,
            },
          ],
        };
      }

      const currentWeather = (weatherData as any).current.temp_c;
      return {
        content: [
          {
            type: "text",
            text: `Current weather for Brazil: Sunny, ${Math.trunc(Number(currentWeather))}°C: data: ${JSON.stringify(weatherData)}`,
          },
        ],
      };
    },
  },
];

export default tools;
