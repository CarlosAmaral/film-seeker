const http = require("http");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const config = require("./config");
const {imagePlaceholder, removeDuplicate} = require("./helpers");
// Define handlers
const handlers = {};

// Api Movie Search handler
handlers.apiSearch = (data, callback) => {
  // Movie name -- Required -- validation if it's more than 3 chars
  const name =typeof data.queryString.name == "string" && data.queryString.name.trim().length >= 3
      ? data.queryString.name.trim()
      : false;

  if (name) {
    
    const options = mapOptions(name);

    myCache.get(name, function( err, value ){
      if(!err){
        if(value == undefined){
          const promises = [
            getMovies(options), 
            getMovies(options)
          ];
      
          Promise.all(promises).then(([firstCall, secondCall]) => {
              const result = removeDuplicate(firstCall.Search.concat(secondCall.Search), "imdbID")
              
              myCache.set(name, result)
              callback(200, result)
            }).catch(err => {
              callback(500, { errorMessage: err });
            });
        } else {
          callback(200, value)
        }
      }
    });

  } else {
    callback(400, {
      errorMessage:
        "Missing required field 'name' or its length is not greater than 3 characters"
    });
  }
};

function getMovies(options) {

  return new Promise((resolve, reject) => {
    http.get(options, response => {
      let body = "";

      response.on("data", data => body += data);
      response.on("end", _ => {
        const parsedBody = JSON.parse(body);
        
        if (parsedBody.Response == "False") {
          reject(parsedBody.Error);
        } else {
          parsedBody.Search.forEach(payload => payload.Poster = imagePlaceholder(payload.Poster))
          resolve(parsedBody);
        }
      });
    });
  });
}

function mapOptions(name){
  return {
      host: config.omdbAPI.hostname,
      path: `/?apikey=${config.omdbAPI.apiKey}&type=${config.omdbAPI.type}&r=${config.omdbAPI.dataType}&s=${name}`,
      headers: {
        "Content-Type": "application/json"
      }
    };
}

// Not found handler
handlers.notFound = (_, callback) => {
  callback(404, { Error: "Route not found on this server" });
};

module.exports = handlers;