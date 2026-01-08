import * as skinview3d from "https://cdn.jsdelivr.net/npm/skinview3d@3.4.1/+esm";

const viewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin_container"),
    width: 300,
    height: 280,
    skin: "img/skin.png" 
});

// Optional: Make them walk!
viewer.animation = new skinview3d.WalkingAnimation();
viewer.animation.speed = 0.2;

// Optional: Let the user rotate with their mouse
viewer.controls.enableRotate = true;

console.log("hi!");