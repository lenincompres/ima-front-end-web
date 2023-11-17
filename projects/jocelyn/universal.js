export async function loadHeader(){
  let response = await fetch('./elements/header.html');
  pageHeader.innerHTML = await response.text();
}


// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAn1metQC_sEWxyRDLlz6l1EAo5lZlWyN-q3sJsSvl5hZpwWrmqnfL-jnO3hkkimV_R3FmC70OcFxGPxbayNq9iYyRLKyq5hNLzBtjRcDR4SsVnnhhXkBJe4_RzP9K-8l6_pyQkTsqHAqdK-2SUtoL3xmuQvymXlHxZa7dOpM6CsdgXx6Erbfl7mNkGACsas-gztOYc7a1ammzcwDNLHSrmWbTUYHtIrVkGbZ30BmGV5JD2jqWOPEKebrRex6oiIkO0aPzpGgfUrPxgEtEz';
/*
  I went to https://developer.spotify.com/ and took this token from there.
  Apparently it expires every so often.
*/

export async function fetchSpotifyApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}