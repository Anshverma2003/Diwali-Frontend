const scene = document.querySelector('.scene');
const diyas = document.querySelectorAll('.house');
const fireworks = document.querySelector('.main');
const zoomOverlay = document.querySelector('.zoom-wrapper');
const dynamicImages = document.querySelectorAll('.dynamicImages');
const middle = document.getElementById('middleDiya');
const city = document.querySelector('.city');

let zoomLevel = 1;
let maxZoom = 3;
let minZoom = 1;


const images = [
    '../Assets/diya_loop_1.svg',
    '../Assets/diya_loop_1.svg',
    '../Assets/diya_loop_2.svg', 
    '../Assets/diya_loop_3.svg',
    '../Assets/diya_loop_4.svg',
    '../Assets/diya_loop_5.svg',
    '../Assets/diya_loop_6.svg',
    '../Assets/diya_loop_7.svg',
    '../Assets/diya_loop_8.svg',
    '../Assets/diya_loop_9.svg',
    '../Assets/diya_loop_10.svg',
    '../Assets/diya_loop_11.svg'
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
        if (updatedImagesCount === dynamicImages.length) {
            setTimeout(() => {
                city.style.display = 'none'; 
                zoomOverlay.style.display = 'block';
            }, 2000);
        }
    });
});

middle.setAttribute('draggable', 'true');

middle.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', ''); 
});




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


