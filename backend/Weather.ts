import { type Datex } from "unyt_core/datex.ts";

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

/**
 * Method to request weather data for a location
 * @param location e.g. 'Ulm'
 * @param key API key
 * @returns Weather data object
 */
export const getWeather = async (location: string, key: string) => {
	const result: Record<string, any> = await datex.get(
		`http://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(location)}&days=4&aqi=yes&alerts=no`
	);
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
