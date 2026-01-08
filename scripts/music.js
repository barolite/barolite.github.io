const API_URL = 'https://candid-sunshine-90af46.netlify.app/.netlify/functions/nowplaying';

async function fetchNowPlaying() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`http error status ${response.status}`);

        const data = await response.json();
        const track = data.recenttracks.track[0];
        const scrobbles = data.recenttracks['@attr'];
        

        const artist = track.artist['#text'];
        const title = track.name;
        const album = track.album['#text'];
        const imageList = track.image;
        const image = imageList && imageList.length ? imageList[imageList.length - 1]['#text'] : '';
        const count = scrobbles.total;

        if (track['@attr'] && track['@attr'].nowplaying === 'true') {
            document.getElementById('song').innerHTML = `<b>${title}</b>`;
            document.getElementById('artist').innerHTML = `${artist}`;
            document.getElementById('album').innerHTML = `on ${album}`;
            document.getElementById('album-cover').src= `${image}`; //album cover
            document.getElementById('marquee-bg').style.display = "block";
        } else {
            document.getElementById('song').innerHTML = '<i>Not playing music</i>';
            document.getElementById('artist').innerHTML = ``;
            document.getElementById('album').innerHTML = ``;
            document.getElementById('album-cover').src = "img/music.svg" // default
            document.getElementById('marquee-bg').style.display = "none";
        }

        if (scrobbles.total) {
            document.getElementById('song-count').innerHTML = `${count}`;
        } else {
            document.getElementById('song-count').innerHTML = '???';
        }

    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        document.getElementById('song').innerHTML = 'error loading music info';
        document.getElementById('album-cover').src = '/.img/music.svg';
    }
}

fetchNowPlaying();




