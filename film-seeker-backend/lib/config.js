const environments = {};

// Staging (default) environment
environments.staging = {
  httpPort: 3001,
  envName: "staging",
  omdbAPI: {
    hostname: "omdbapi.com",
    apiKey: "9396a5a5",
    type: "movie",
    dataType: "json"
  },
  frontEnd: {
    url: "http://localhost:3000",
    imagePlaceholderPath: 'images/poster_placeholder.png',
    rejectedHost:"ia.media-imdb.com"
  }
};

// Production environment
environments.production = {
  httpPort: 5001,
  envName: "production",
  omdbAPI: {
    hostname: "omdbapi.com",
    apiKey: "9396a5a5",
    type: "movie",
    dataType: "json"
  },
  frontEnd: {
    url: "http://localhost:5000",
    imagePlaceholderPath: 'images/poster_placeholder.png',
    rejectedHost:"ia.media-imdb.com"
  }
};

const currentEnv =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

const envToExport =
  typeof environments[currentEnv] == "object"
    ? environments[currentEnv]
    : environments.staging;

module.exports = envToExport;
