// deno-lint-ignore-file no-explicit-any
import { Logger } from "unyt_core/utils/logger.ts";
import { Datex } from "unyt_core/datex.ts";
import { Overview } from '../common/components/Overview.tsx';
import { Search } from "../common/components/Search.tsx";
import { renderStatic } from "uix/base/render-methods.ts";
import { Entrypoint } from "uix/html/entrypoints.ts";
import { provideError } from "uix/html/entrypoint-providers.tsx";

const logger = new Logger("Weather");

export type Weather = {
	location: {
		name: string,
		region: string
	},
	current: {
		text: string,
		isDay: boolean,
		icon: string,
		temp: number,
		tempMax: number,
		sunrise: string,
		sunset: string,
		tempMin: number,
		air: number,
		uv: number
	},
	forecast: {
		icon: string,
		date: Datex.Time | number,
		temp: number,
		tempMax: number,
		tempMin: number,
		air: number
	}[]
}

const API_KEY = Datex.Runtime.ENV.API_TOKEN ?? "<YOUR_API_TOKEN>";
logger.info("Using API key", API_KEY);
const getWeather = async (location: string) => {
	const result: any = await datex.get(`http://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(API_KEY)}&q=${encodeURIComponent(location)}&days=4&aqi=yes&alerts=no`)
	logger.debug(result);
	const current = result.current;
	const today = result.forecast.forecastday[0];
	const weather: Weather = {
		location: {
			name: result.location.name,
			region: result.location.region
		},
		current: {
			uv: current.uv,
			isDay: current.is_day,
			air: current.air_quality ? 
				current.air_quality?.["us-epa-index"] - 1 : 0,
			text: current.condition.text,
			icon: current.condition.icon.match(/[^\/]+\/[^\/]+\.png/i).at(0),
			temp: current.temp_c,
			sunrise: today.astro.sunrise,
			sunset: today.astro.sunset,
			tempMax: today.day.maxtemp_c,
			tempMin: today.day.mintemp_c
		},
		forecast: result.forecast.forecastday.slice(1).map((day: any) => {
			return {
				icon: day.day.condition.icon.match(/[^\/]+\/[^\/]+\.png/i).at(0),
				date: day.date_epoch * 1000,
				temp: day.day.avgtemp_c,
				tempMax: day.day.maxtemp_c,
				tempMin: day.day.mintemp_c,
				air: day.day.air_quality ? 
					day.day.air_quality?.["us-epa-index"] - 1 : 0
			}
		})
	}
	return weather;
}

export default {
	'/': renderStatic(<Search/>),
	'/:location': async (_, { location }) => {
		location = decodeURIComponent(location);
		logger.info("Requesting weather info for", location);
		try {
			const weather = await getWeather(location);
			logger.success("Got weather info for", location, weather.current);
			return renderStatic(<Overview weather={weather}/>);
		} catch (error: unknown | Error) {
			console.error(error);
			return provideError(`<h2>Could not get weather for '${decodeURIComponent(location).replace(/[^a-zA-Za-zA-ZÄÖÜäöüß\- ]/, '')}'!</h2><br><small>${error}</small>`);
		}
	}
} satisfies Entrypoint;