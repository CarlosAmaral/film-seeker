# Film Seeker Backend

### Introduction 

This NodeJS backend consumes the [OMDb API The Open Movie Database](http://www.omdbapi.com) and thus it avoids Cross-Origin Resource Sharing (CORS) if the requests were to be made through the browser. This NodeJS API also has CORS enabled to respond only to the Film Seeker Frontend server implemented here.

This backend has only one route: `api/search`, which only takes a `GET` method with one required query string entitled **name** (film name to be searched) being required query strings, and performes data validation to the requests.

Due to the requirements, the OMDB API is invoked twice to retrieve up to 20 results but the backend is removing duplicated values from the output of the two calls, as well as, replacing the Poster value with a path to an image placeholder when its value is "N/A" or an url that throw errors.

The library used for server-side caching is **node-cache**. This dependency makes use of NodeJS' internal caching and, in the context of this application, it will check for the name of the film the user is searching for and if it's already cached, it will return the cached collection, otherwise it will invoke the OMDb API and afterwards cache it.

One example of invoking this API's above route would be: `http://localhost:3001/api/search?name=greenmile` 