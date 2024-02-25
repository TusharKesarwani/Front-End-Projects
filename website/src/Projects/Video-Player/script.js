// Array of video file names in the current directory
var currentDirVideoFiles = [
    'video.mp4', 
    'video.mp4', 
    'video.mp4', 
    'video.mp4', 
    'video.mp4', 
    'video.mp4'
];

// Get the video container element from the HTML document
const videoContainer = document.getElementsByClassName('video-container')[0];

// Function to create video elements based on the provided array of video files
function createElements(arr) {

    for (let i = 0; i < arr.length; i++) {
        // Create a div element for each video
        let videoDiv = document.createElement('div');
        videoDiv.classList = 'video';

        // Create a video element
        let video = document.createElement('video');
        video.muted = true;

        // Path of the video
        video.src = `./${arr[i]}`;

        // Adding the feature so that user does not download the video
        video.controlsList.add('nodownload');

        // Adding the option so that menu option will remove/disable
        video.oncontextmenu = function (e) {
            e.preventDefault();
        };

        // Append the video element to the video div
        videoDiv.appendChild(video);

        // Append the video div to the video container
        videoContainer.appendChild(videoDiv);
    }
}

// Function to handle the click events of video elements
function load() {

    // Add click event listener to each video element inside the video container
    document.querySelectorAll('.video-container video').forEach(vid => {
        vid.onclick = () => {
            // Display the popup video container
            document.querySelector('.popup-video').style.display = 'block';

            // Set the source of the popup video to the clicked video source
            document.querySelector('.popup-video video').src = vid.getAttribute('src');
        }
    });

    // Add click event listener to the close button of the popup video
    document.querySelector('.popup-video span').onclick = () => {
        let videoContainer = document.querySelector('.popup-video');
        let video = videoContainer.querySelector('video');

        // Pause the video and hide the popup video container
        video.pause();
        videoContainer.style.display = 'none';
    }
}

// Initialization function
function init() {
    // Create video elements based on the current directory video files
    createElements(currentDirVideoFiles);

    // Wait for some time before attaching the event listeners
    setTimeout(load, 1500);
}

// Call the init function to start the process
init();

// Adding the option so that menu option will remove/disable
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
