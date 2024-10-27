const scene = document.querySelector('.scene');
const diyas = document.querySelectorAll('.house');
const fireworks = document.querySelector('.main');
const zoomOverlay = document.querySelector('.zoom-wrapper');
const dynamicImages = document.querySelectorAll('.dynamicImages');
const middle = document.getElementById('middleDiya');
const city = document.querySelector('.city');
const CanvasId=document.getElementById('Canvas')

let zoomLevel = 1;
let maxZoom = 3;
let minZoom = 1;


const audio = [
      './Sounds/sounds_explosion0.mp3',
      './Sounds/sounds_explosion1.mp3',
      './Sounds/sounds_explosion2.mp3',
]

const images = [
    './Assets/diya_loop_1.svg',
    './Assets/diya_loop_1.svg',
    './Assets/diya_loop_2.svg', 
    './Assets/diya_loop_3.svg',
    './Assets/diya_loop_4.svg',
    './Assets/diya_loop_5.svg',
    './Assets/diya_loop_6.svg',
    './Assets/diya_loop_7.svg',
    './Assets/diya_loop_8.svg',
    './Assets/diya_loop_9.svg',
    './Assets/diya_loop_10.svg',
    './Assets/diya_loop_11.svg'
];

let j = 0;
let i = 0;

// Counter for how many dynamic images have been updated
let updatedImagesCount = 1;

function centreDiya() {
    middle.src = images[j]; 
    j = (j + 1) % images.length; 
}

setInterval(centreDiya, 100);

dynamicImages.forEach((dynamicImage) => {
    dynamicImage.addEventListener('dragover', (event) => {
        event.preventDefault(); 
    });

    dynamicImage.addEventListener('drop', (event) => {
        event.preventDefault(); 

        dynamicImage.src = middle.src;
        
        // Increment the counter when an image is updated
        updatedImagesCount++;

        function burn() {
            dynamicImage.src = images[i];
            i = (i + 1) % images.length;
        }
        
        setInterval(burn, 150);

        // Check if all dynamic images have been updated
        // Check if all dynamic images have been updated
        if (updatedImagesCount === dynamicImages.length) {
          setTimeout(() => {
              city.style.display = 'none'; 
              zoomOverlay.style.display = 'block';
              CanvasId.style.display='block';
              rocket();
              setInterval(playSound , 100);
          }, 2000);
        }
        // Check if all dynamic images have been updated
        if (updatedImagesCount === dynamicImages.length) {
          // Add fade-out to the city scene
          city.classList.add('fade-out');

          setTimeout(() => {
              city.style.display = 'none'; 

              // Add fade-in to the canvas and zoom overlay
              zoomOverlay.style.display = 'block';
              CanvasId.style.display = 'block';
              zoomOverlay.classList.add('fade-in');
              CanvasId.classList.add('fade-in');

              rocket();
              setInterval(playSound, 100);
          }, 2000); // 2s delay to match the fade-out time
        }

    });
});

middle.setAttribute('draggable', 'true');

middle.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', ''); 
});

// const backgroundMusic = new Audio('./Sounds/Soothing.mp3'); // Path to your audio file
// backgroundMusic.loop = true; // Loop the music
// backgroundMusic.volume = 0.5; // Set the volume

// let musicPlayed = false; // Track if the music has been played

// window.addEventListener('mouseover', () => {
//     if (!musicPlayed) {
//         backgroundMusic.play().catch(error => {
//             console.log("Auto-play failed, user interaction required.");
//         });
//         musicPlayed = true; // Prevent music from playing multiple times
//     }
// });

// window.addEventListener('click', playBackgroundMusic, { once: true });

// const backgroundMusic = "./Sounds/Soothing.mp3"; // Path to your audio file
// backgroundMusic.loop = true; // Loop the music
// backgroundMusic.volume = 0.5; // Set the volume
// console.log(backgroundMusic);
// backgroundMusic.play();
// // Function to play background music
// function playMusic() {
//     backgroundMusic.play().catch(error => {
//         console.log("Auto-play failed, user interaction required.");
//     });
// }
// setInterval(backgroundMusic.play() , 100);

// Attempt to play music immediately on load
// window.addEventListener('onMouseHover', playMusic);

const backgroundMusic = new Audio('./Sounds/Soothing.mp3');
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.5;

const diyaImage = document.getElementById('middleDiya');

const playMusic = () => {
    backgroundMusic.play().catch(error => {
        console.log("Auto-play failed, user interaction required.");
    });
};

diyaImage.addEventListener('touchstart', playMusic, { once: true });
diyaImage.addEventListener('click', playMusic, { once: true });

function playSound() {
  const randomIndex = Math.floor(Math.random() * audio.length + 1);
  var play = new Audio(audio[randomIndex]);
  play.play();
  backgroundMusic.play();
}


// Disable default scrolling and use the mouse wheel to control zoom
// window.addEventListener('wheel', (event) => {
//   event.preventDefault(); // Prevent default scroll behavior

//   // Control zoom direction based on scroll (up for zooming in, down for zooming out)
//   if (event.deltaY < 0) {
//     zoomLevel = Math.min(maxZoom, zoomLevel + 0.1); // Zoom in
//   } else if (event.deltaY > 0) {
//     zoomLevel = Math.max(minZoom, zoomLevel - 0.1); // Zoom out
//   }

//   // Apply zoom to the scene using transform
//   scene.style.transform = `scale(${zoomLevel})`;


//   // Show fireworks when zoom level is near the maximum
//   if (zoomLevel > 2.5) {
//     fireworks.classList.add('visible');
//     diyas.forEach(diya =>{
//       diya.style.display = 'none';
//     })
//   } else {
//     fireworks.classList.remove('visible');
//     diyas.forEach(diya =>{
//       diya.style.display = 'block';
//     })
//   }


//   if (zoomLevel > 2) {
//     zoomOverlay.style.opacity = '1'; 
//   } else {
//     zoomOverlay.style.opacity = '0'; 
//   }
// });



// rocket code

function rocket()
{
    var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass= [];

var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;
}

function newShell() {

  var left = (Math.random() > 0.5);
  var shell = {};
  shell.x = (1*left);
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {

  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (i = 0; i < pasCount; i++) {

    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

		pas.xoff = s *  Math.sin((5 - a) * (Math.PI / 2));
  	pas.yoff = s *  Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

var lastRun = 0;
Run();
function Run() {

  var dt = 1;
  if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
	lastRun = performance.now();

  //ctx.clearRect(0, 0, cwidth, cheight);
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(0, 0, cwidth, cheight);

  if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

  for (let ix in shells) {

    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= (shell.xoff * dt * 0.001);
    shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {

    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= (pas.xoff * dt * 0.001);
    pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if ((pas.y > cheight)  || (pas.y < -50) || (pas.size <= 0)) {
        pass.splice(ix, 1);
    }
  }
  requestAnimationFrame(Run);
}
}


















middle.addEventListener('touchstart', startDrag, false);
middle.addEventListener('touchmove', onDrag, false);
middle.addEventListener('touchend', endDrag, false);

let offsetX, offsetY;

function startDrag(event) {
    const touch = event.touches[0];
    offsetX = touch.clientX - middle.getBoundingClientRect().left;
    offsetY = touch.clientY - middle.getBoundingClientRect().top;
}

function onDrag(event) {
    event.preventDefault(); // Prevent scrolling on drag
    const touch = event.touches[0];
    middle.style.position = 'absolute';
    middle.style.left = `${touch.clientX - offsetX}px`;
    middle.style.top = `${touch.clientY - offsetY}px`;
}

function endDrag() {
    // Optional: Add any end-drag behavior if necessary
}
