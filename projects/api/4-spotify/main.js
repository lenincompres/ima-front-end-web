// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDQizHBsTpfE-lKOpYuAJkHyI3wDmD93BSYgiCUqB3V9LQ4Al9L75gjg9cy4bAX33lQCHd3ZcOgOKcPstJuDUQKqzjtIW63RtaFLTM8_bGS4JB9J-Rb0CUMq4_NwnXPpdDIEHcX9Grq29lEhd4jVdDIVVcHcwfCPchSh_rLrwvBnXuW5IdpO11XPjCb0g7oFFu1Fsc4GWqevGgdJfYK7H0f5GsW9xBqZtj6fyOWSiSo-olsdKkedsr7eAr6trg1oXSqSxNL-cYZafCyH5o4';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

async function getPlaylists(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  let response = await fetchWebApi( 'v1/users/me/playlists', 'GET')
  console.log(response);
}

getPlaylists();