const userId = "707094670588641400";
const api1 = `https://api.lanyard.rest/v1/users/${userId}`;
const api2 = `https://dcdn.dstn.to/profile/${userId}`;
let activityStartTimestamp = null;

/* for status  */
const statusMap = {
online: "status-online",
idle: "status-idle",
dnd: "status-dnd",
offline: "status-offline"
};

async function updateWidget() {
    try {
        const res = await fetch(api1);
        const { data } = await res.json();
        const bannerres = await fetch(api2);
        const { user_profile } = await bannerres.json();
        let startTimestamp = null;

        //avatar section
        const avatarURL = data.discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.discriminator) % 5}.png`;

        // banner section, uses a default when i run out of nitro lol
        if (user_profile.banner) {
                banner = `https://cdn.discordapp.com/banners/${data.discord_user.id}/${user_profile.banner}.jpg?size=1024&animated=true`; //file extension has to be changed manually
        } else {
            banner = `https://hcdn.snowme.ws/5.jpg`
        }

        // activity section
        const playing = data.activities.find(a => a.type === 0);
        const custom = data.activities.find(a => a.type === 4);

        let activityText = "";
        let activityDetails = "Loading...";
        let activityImage = "./img/puzzle.svg";
        
        if (playing) {
            activityText = `playing <b>${playing.name}</b>`;
            activityDetails = playing.details || "";

            if (playing.assets && playing.assets.large_image) {
                let imageKey = playing.assets.large_image;
                if (imageKey.startsWith("mp:external/")) {
                    activityImage = `https://media.discordapp.net/${imageKey}`;
                } else {
                    activityImage = `https://cdn.discordapp.com/app-assets/${playing.application_id}/${imageKey}.png`;
                }
            }
        } else {            
            activityText = "No activity";
            activityDetails = "Might be offline or something";
        }

        activityDetails = "";
        if (data.discord_status == "online") {
            statusText = "Online";
        } else if (data.discord_status == "idle") {
            statusText = "Idle";
        } else if (data.discord_status == "dnd") {
            statusText = "Do Not Disturb";
        } else if (data.discord_status == "offline") {
            statusText = "Offline"
      }

        document.getElementById('discord-pfp').src = avatarURL;
        document.getElementById('discord-banner').src = banner;
        document.getElementById('activity').innerHTML = activityText;
        // document.getElementById('details').innerHTML = activityDetails;
        // document.getElementById('activity-image').src = activityImage;
        document.getElementById("status").innerHTML = statusText;


    } catch (error) {
        console.error("ERROR:", error);
    }
}

updateWidget();