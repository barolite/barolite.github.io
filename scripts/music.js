
const nowPlayingText = document.getElementById('nowplaying');

//const playingorno = document.getElementById('playingorno');
//const albumCoverDiv = document.getElementById('album');

const API_URL = 'https://candid-sunshine-90af46.netlify.app/.netlify/functions/nowplaying';

async function fetchNowPlaying() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`http error status ${response.status}`);

        const data = await response.json();
        const track = data.recenttracks.track[0];

        const artist = track.artist['#text'];
        const title = track.name;
        const imageList = track.image;
        const image = imageList && imageList.length ? imageList[imageList.length - 1]['#text'] : '';

        /*if (track['@attr'] && track['@attr'].nowplaying === 'true') {
            playingorno.textContent = '';
        } else {
            playingorno.textContent = '';
        }*/
        if (track['@attr'] && track['@attr'].nowplaying === 'true' && !spotify) {
            nowPlayingText.textContent = `listening to ${artist} - ${title} via last.fm`;
        } else {
            nowPlayingText.textContent = '';
        }

        /* album cover part
        if (image) {
            albumCoverDiv.innerHTML = `<img src="${image}">`; //album cover
        } else {
            albumCoverDiv.innerHTML = `<img style="position: absolute; transform: rotate(45deg)" src="images/default.png">`; // default
        }*/

    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        nowPlayingText.textContent = 'error loading music info';
        albumCoverDiv.innerHTML = `<img id="album" src="images/default.png">`;
    }
}

    fetchNowPlaying();
