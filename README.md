# Example: Weather app

This repository demonstrates some essential concept of the
[UIX](https://uix.unyt.org) framework such as
[SSR](https://unyt.org/glossary#ssr) and
[Web components](https://unyt.org/glossary#web-components) using the example of
a **weather app**.

## Installation

1. Install the **UIX command line tool** following the
   [Getting Started](https://docs.unyt.org/manual/uix/getting-started#the-uix-command-line-tool)
   guide in our documentation.

2. Clone this repository to your local machine:

   ```bash
   $ git clone https://github.com/unyt-org/example-weather-app.git
   ```
3. Request a free API key from [weatherapi.com](https://www.weatherapi.com/)
4. Create an `API_KEY`-environment variable
   ```bash
   $ export API_KEY="<YOUR_KEY>"
   ```
5. Run the project local
   ```bash
   $ uix --port 8000
   ```
6. Navigate to your favourite web browser and open http://localhost:8000 to see
   everything in action.

## Structure

This diagram outlines the UIX default project structure. Since everything is
rendered on the server there is just a
[back-end](https://unyt.org/glossary#back-end) folder.

```
.
└── example-weather-app/
    ├── backend/
    │   ├── .dx                 // Config file for deployment
    │   ├── Weather.ts          // Weather API
    │   └── entrypoint.tsx      // Back-end entrypoint
    ├── common/
    │   ├── components/
    │   │   ├── Search.scss     // Search style declaration
    │   │   ├── Search.tsx      // Search component
    │   │   ├── Overview.scss   // Overview style declaration
    │   │   └── Overview.tsx    // Overview component
    │   ├── theme.tsx           // Theme definition
    │   ├── weather-theme.scss  // Theme stylesheet
    │   └── res/                // Ressources folder
    ├── app.dx                  // Endpoint config file
    └── deno.json               // Deno config file
```

## Features

- Location search
- 3 days Forecast, Air Quality, Sunrise info

## Preview

<img src=".github/screenshot.png" width="400">

## Explanation

### Environment Variables

In [DATEX](https://datex.unyt.org), environment variables can be accessed using
`Datex.Runtime.ENV`.

---

<sub>&copy; unyt 2025 • [unyt.org](https://unyt.org)</sub>
