import { UIX } from "uix";
import { uixLightPlain } from "uix/themes/uix-light-plain.ts";
import { uixDarkPlain } from "uix/themes/uix-dark-plain.ts";

UIX.Theme.registerTheme(UIX.Theme.extend(uixDarkPlain, {
	name: "unyt-dark",
	values: {
		"accent": "white",
		"color-1": "#ff8080",
		"color-2": "#554afa"
	}
}));
UIX.Theme.registerTheme(UIX.Theme.extend(uixLightPlain, {
	name: "unyt-light",
	values: {
		"accent": "white",
		"color-1": "#ff8080",
		"color-2": "#554afa"
	}
}));

UIX.Theme.useThemes("unyt-light", "unyt-dark");