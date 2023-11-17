import { fetchSpotifyApi, loadHeader } from "./universal.js";


loadHeader();


loadSongs();

async function loadSongs(){
  // get tracks from api https://api.spotify.com/v1/tracks 
  // https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
  
  let tracks = "4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M";

  let data = await fetchSpotifyApi(`https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B`, 'GET');

  console.log(data);
  
}