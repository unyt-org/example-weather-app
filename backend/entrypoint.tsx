import { Logger } from "unyt_core/utils/logger.ts";
import { Datex } from "unyt_core/datex.ts";
import { Overview } from '../common/components/Overview.tsx';
import { Search } from "../common/components/Search.tsx";
import { renderBackend } from "uix/base/render-methods.ts";
import { Entrypoint } from "uix/html/entrypoints.ts";
import { getWeather } from "backend/Weather.ts";
import "common/theme.tsx";

const logger = new Logger("Weather");

const API_KEY = Datex.Runtime.ENV.API_TOKEN ?? "<YOUR_API_TOKEN>";
logger.info("Using API key", API_KEY);

/**
 * Route definition for backend routes
 */
export default {
	
	// The page at / returns a backend rendered search component
	'/': renderBackend(<Search/>),

	// The :param syntax can be used to get dynamic route
	// parameters such as the location
	'/:location': async (_, { location }) => {
		location = decodeURIComponent(location);
		logger.info("Requesting weather info for", location);
		try {
			// Requesting API to return weather object
			const weather = await getWeather(location, API_KEY);
			logger.success("Got weather info for", location, weather.current);

			// Pass the weather data to the overview component
			// and perform backend rendering
			return renderBackend(<Overview weather={weather}/>);
		} catch (error) {
			logger.error(error);
			throw <>
				<h1>Could not get weather for '{decodeURIComponent(location).replace(/[^a-zA-Za-zA-ZÄÖÜäöüß\- ]/, '')}'!</h1>
				<span>{error}</span>
			</>;
		}
	}
} satisfies Entrypoint;