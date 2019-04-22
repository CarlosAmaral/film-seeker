const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// Module imports
const handlers = require("./lib/handlers");
const config = require("./lib/config");

// Instantiate the HTTP server
const httpServer = http.createServer((request, response) => {
  unifiedServer(request, response);
});

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
  console.info(
    "Your HTTP server has started in the following port: ",
    config.httpPort
  );
});

const unifiedServer = (request, response) => {
  //Parse and trim the url to remove added bars at the end
  const parsedURL = url.parse(request.url, true);
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Check the http method
  const httpMethod = request.method.toLowerCase();

  // Parse query string
  const queryString = parsedURL.query;

  // Parse headers
  const parseHeaders = request.headers;

  //Parse payload
  const decoder = new StringDecoder("utf-8");

  let buffer = "";
  request.on("data", data => {
    buffer += decoder.write(data);
  });
  request.on("end", () => {
    buffer += decoder.end();

    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    const data = {
      trimmedPath: trimmedPath,
      queryString: queryString,
      method: httpMethod,
      headers: parseHeaders,
      payload: buffer
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof (statusCode == "number") ? statusCode : 200;

      payload = typeof (payload == "object") ? payload : {};

      const payloadString = JSON.stringify(payload);

      response.setHeader("Access-Control-Allow-Origin", config.frontEnd.url);
      response.setHeader("Cache-Control", "private");
      response.setHeader("Content-Type", "application/json");
      response.writeHead(statusCode);
      response.end(payloadString);
    });
  });
};

const router = {
  "api/search": handlers.apiSearch
};
