const scene = document.querySelector('.scene');
const diyas = document.querySelectorAll('.diya');
const fireworks = document.querySelector('.fireworks');
const zoomOverlay = document.querySelector('.zoom-overlay'); // Select the red overlay
const dynamicImage = document.querySelectorAll('.dynamicImages')

let zoomLevel = 1;
let maxZoom = 3;
let minZoom = 1;

const images = [
    '../Assets/diya_loop_1.svg',
    '../Assets/diya_loop_1.svg',
    '../Assets/diya_loop_2.svg', 
    '../Assets/diya_loop_3.svg' ,
    '../Assets/diya_loop_4.svg',
    '../Assets/diya_loop_5.svg',
    '../Assets/diya_loop_6.svg',
    '../Assets/diya_loop_7.svg',
    '../Assets/diya_loop_8.svg',
    '../Assets/diya_loop_9.svg',
    '../Assets/diya_loop_10.svg',
    '../Assets/diya_loop_11.svg'
];

let i = 0;

function changeImage ()
{
    dynamicImage.forEach(img=>{
        img.src = images[i];
    })
    i = (i + 1) % images.length 
}

setInterval(changeImage , 100);


// Disable default scrolling and use the mouse wheel to control zoom
window.addEventListener('wheel', (event) => {
  event.preventDefault(); // Prevent default scroll behavior

  // Control zoom direction based on scroll (up for zooming in, down for zooming out)
  if (event.deltaY < 0) {
    zoomLevel = Math.min(maxZoom, zoomLevel + 0.1); // Zoom in
  } else if (event.deltaY > 0) {
    zoomLevel = Math.max(minZoom, zoomLevel - 0.1); // Zoom out
  }

  // Apply zoom to the scene using transform
  scene.style.transform = `scale(${zoomLevel})`;

  // Show diyas when zoom level is beyond a threshold
  if (zoomLevel > 1.5) {
    diyas.forEach(diya => {
      diya.style.opacity = '1'; // Show the diyas
    });
  } else {
    diyas.forEach(diya => {
      diya.style.opacity = '0'; // Hide diyas when zoomed out
    });
  }

  // Show fireworks when zoom level is near the maximum
  if (zoomLevel > 2.5) {
    fireworks.classList.add('visible');
  } else {
    fireworks.classList.remove('visible');
  }

  // Show red overlay when zoom level exceeds a threshold
  if (zoomLevel > 2) {
    zoomOverlay.style.opacity = '1'; // Show the overlay
  } else {
    zoomOverlay.style.opacity = '0'; // Hide the overlay
  }
});
