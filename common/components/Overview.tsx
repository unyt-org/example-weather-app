import { type Weather } from "backend/Weather.ts";
import { Component } from "uix/components/Component.ts";
import { Path } from "uix/utils/path.ts";
import { template } from "uix/html/template.ts";

@template(function (this) {
  const weather = this.properties.weather;
  return (
    <div>
      <a class="back" href="/">
        <span class="fa fa-chevron-left" /> Back
      </a>
      <div class="main">
        <h3>
          {weather.location.name}
          {weather.location.region
            ? <span>({weather.location.region})</span>
            : undefined}
        </h3>
        <h1>{weather.current.temp}&deg;C</h1>
        <span>{weather.current.text}</span>
        <div class="temperature">
          <span>H: {weather.current.tempMax}&deg;C</span>
          <span>L: {weather.current.tempMin}&deg;C</span>
        </div>
        <img
          class="today-icon"
          src={new Path(`../res/${weather.current.icon}`)}
        />

        <h2 class="header">3-Days Forecast</h2>
        <div class="forecast">
          {weather.forecast.map((day) => (
            <div>
              <img src={new Path(`../res/${day.icon}`)} />
              <h4>{day.temp}&deg;</h4>
              <span>
                {new Date(day.date).toLocaleString("en-us", {
                  weekday: "long",
                })}
              </span>
            </div>
          ))}
        </div>
        <div class="air-quality">
          <h4>
            <span class="fa fa-solid fa-globe" /> Air Quality
          </h4>
          <h1>
            {(
              [
                "Good",
                "Moderate",
                "Maybe unhealthy",
                "Unhealthy",
                "Very Unhealthy",
                "Hazardous",
              ][weather.current.air]
            ) ?? "Unknown"}
          </h1>
        </div>

        <h2 class="header">Information</h2>
        <div class="additional">
          <div>
            <h3>
              <span class="fa fa-sun" /> Sunrise
            </h3>
            <h2>{weather.current.sunrise}</h2>
            <span>
              Sunset: <a>{weather.current.sunset}</a>
            </span>
          </div>
          <div>
            <h3>
              <span class="fa fa-filter" /> UV-Index
            </h3>
            <h2>{weather.current.uv}</h2>
            <span>{weather.current.isDay ? "Day" : "Night"}</span>
          </div>
        </div>
      </div>
      <a href="https://www.weatherapi.com/" title="Free Weather API">
        Powered by WeatherAPI.com
      </a>
    </div>
  );
})
// To access the options field in frontend
// we need to pass the field to the inheritedFields
@standalone({
  inheritedFields: ["options"],
})
export class Overview extends Component<{ weather: Weather }> {
  // Life-cycle method that is called when the component is displayed
  protected override onDisplay() {
    console.info("The chats pointer", this.properties.weather);
  }
}
