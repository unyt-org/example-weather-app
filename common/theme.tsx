import { UIX } from "uix";
import { defaultThemes } from "uix/base/themes.ts";

UIX.Theme.registerTheme(UIX.Theme.extend(defaultThemes.dark, {
	mode: undefined,
	name: "weather-theme",
	values: {
		"accent": "white",
		"color-1": "#ff8080",
		"color-2": "#554afa"
	},
	stylesheets: ["./weather-theme.scss"]
}));
UIX.Theme.useThemes("weather-theme");