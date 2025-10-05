const userId = "707094670588641400";
const apiURL = `https://api.lanyard.rest/v1/users/${userId}`;
const apiURL2 = `https://dcdn.dstn.to/profile/${userId}`;
let activityStartTimestamp = null;
let activityTimerInterval = null;

const statusMap = {
  online: "status-online",
  idle: "status-idle",
  dnd: "status-dnd",
  offline: "status-offline",
};

async function updateWidget() {
  try {
    const res = await fetch(apiURL);
    const { data } = await res.json();
    const bannerres = await fetch(apiURL2);
    const { user_profile } = await bannerres.json();

    // Avatar and status
    const avatarUrl = data.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
      : `https://cdn.discordapp.com/embed/avatars/${
          parseInt(data.discord_user.discriminator) % 5
        }.png`;

    document.getElementById("pfp").src = avatarUrl;
    document.getElementById("status-dot").className = `status-dot ${
      statusMap[data.discord_status]
    }`;
    // Username
    // document.getElementById("username").innerHTML = `${data.discord_user.username}<span class="discriminator">#${data.discord_user.discriminator}</span>`;

    const playing = data.activities.find((a) => a.type === 0);
    const custom = data.activities.find((a) => a.type === 4);

    const spotify = data.spotify;
    // Handle custom status
    if (custom) {
      const emoji = custom.emoji
        ? custom.emoji.id
          ? `<img src="https://cdn.discordapp.com/emojis/${custom.emoji.id}.png" alt="${custom.emoji.name}" height="18" style="vertical-align:middle;">`
          : custom.emoji.name
        : "";
      document.getElementById("status").innerHTML = `"${
        custom.state || ""
      }"`.trim();
    } else {
      document.getElementById("status").textContent = "No custom status.";
    }

    const activityTextEl = document.getElementById("activity");
    const activityDetailsEl = document.getElementById("details");
    const activityImageEl = document.getElementById("largeimage");
    const activityImageEl2 = document.getElementById("largeimage2");

    let activityText = "No activity";
    let activityDetails = ""; // Default details
    let activityImage = null;
    activityImageEl.style.display = "none"; // Hide by default
    activityImageEl2.style.display = "none"; // Hide by default

    if (spotify) {
      activityText = `Listening to <b>${spotify.song}</b> by ${spotify.artist}`;
      activityImage = spotify.album_art_url;
      activityDetails = `on ${spotify.album}`;
    } else if (playing) {
      activityText = `Playing <b>${playing.name}</b>`;
      activityDetails = `${playing.details || ""}`;

      if (playing.assets && playing.assets.large_image) {
        let imageKey = playing.assets.large_image;
        if (imageKey.startsWith("mp:external/")) {
          // Hosted externally
          activityImage = `https://media.discordapp.net/${imageKey}`;
        } else {
          // Discord-hosted
          activityImage = `https://cdn.discordapp.com/app-assets/${playing.application_id}/${imageKey}.png`;
        }
      }
    } else {
            // No activity, so use Discord banner
            
            activityDetails = "";
            if (data.discord_status == "online") {
              activityText = "Online";
            } else if (data.discord_status == "idle") {
              activityText = "Idle";
            } else if (data.discord_status == "do-not-disturb") {
              activityText = "Do Not Disturb";
            } else if (data.discord_status == "offline") {
              document.getElementById("status").textContent = "";
              activityText = "Offline";
            }
            
            
            // Discord banner logic
            if (user_profile.banner) {
                activityImage = `https://cdn.discordapp.com/banners/${data.discord_user.id}/${user_profile.banner}.gif?size=1024&animated=true`;
            } else {
                activityImage = `https://hcdn.snowme.ws/5.jpg`
            }
        }

    activityTextEl.innerHTML = activityText;
    activityDetailsEl.textContent = activityDetails;

    if (activityImage) {
      activityImageEl.src = activityImage;
      activityImageEl2.src = activityImageEl.src;
      activityImageEl.style.display = "block";
      activityImageEl2.style.display = "block";
    }
    if (user_profile.banner) {
        activityImageEl.style.display = "none";

    }

    const activityTimerEl = document.getElementById("timer");
    let startTimestamp = null;

    // Spotify has its own start timestamp
    if (spotify) {
      startTimestamp = spotify.timestamps.start;
    } else if (playing && playing.timestamps && playing.timestamps.start) {
      startTimestamp = playing.timestamps.start;
    }

    if (startTimestamp) {
      startActivityTimer(startTimestamp);
    } else {
      document.getElementById("timer").textContent = "";
      clearInterval(activityTimerInterval);
    }
  } catch (error) {
    console.error("Error loading presence:", error);
    document.getElementById("activity").textContent = "";
  }
}

updateWidget();
function startActivityTimer(startTimestamp) {
  clearInterval(activityTimerInterval); // Reset any previous timer
  activityStartTimestamp = startTimestamp;

  function updateTimer() {
    const now = Date.now();
    const elapsedMs = now - activityStartTimestamp;
    const totalSec = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const formatted = `${hours > 0 ? `${hours}h ` : ""}${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    document.getElementById("timer").textContent = `⏱️ ${formatted}`;
  }

  updateTimer(); // Initial update
  activityTimerInterval = setInterval(updateTimer, 1000);
}

setInterval(updateWidget, 15000); // Refresh every 15 seconds
