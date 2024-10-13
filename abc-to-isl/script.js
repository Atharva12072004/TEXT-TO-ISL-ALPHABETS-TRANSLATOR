function convertToSign() {
    let inputText = document.getElementById('textInput').value.toUpperCase().trim();
    let output = document.getElementById('output');
    output.innerHTML = "";  // Clear any previous content

    // Split the input text into words based on spaces
    let words = inputText.split(/\s+/);

    words.forEach(word => {
        let wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';  // Assign class for styling

        // Create and append heading for the word
        let heading = document.createElement('h2');
        heading.textContent = word;
        wordContainer.appendChild(heading);

        // Create a container for the images to be displayed horizontally
        let imagesContainer = document.createElement('div');
        imagesContainer.className = 'images-container';  // Assign class for styling

        // Create and append images for each character in the word
        for (let char of word) {
            // Check if the character is an uppercase letter or a number
            if (char.match(/[A-Z0-9]/)) {  // Consider alphabetic characters and numbers
                let img = document.createElement('img');
                img.src = `./images/${char}.png`;  // Set the image source dynamically
                img.alt = `${char} sign`;  // Set the alt text dynamically
                imagesContainer.appendChild(img);
            }
        }

        // Append images container to the word container
        wordContainer.appendChild(imagesContainer);

        // Append word container to the output
        output.appendChild(wordContainer);
    });
}

// Function to handle 'Enter' key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        convertToSign();
    }
}

// Generate random triangles
document.addEventListener("DOMContentLoaded", function() {
    const wrap = document.querySelector('.wrap');
    const totalTriangles = 100;  // Number of triangles to be generated

    for (let i = 0; i < totalTriangles; i++) {
        const tri = document.createElement('div');
        tri.classList.add('tri');
        
        // Randomize initial positions
        tri.style.top = `${Math.random() * 100}vh`;
        tri.style.left = `${Math.random() * 100}vw`;

        // Set a random animation duration
        const duration = Math.random() * 5 + 5;  // Between 5s and 10s
        tri.style.animation = `randomMovement ${duration}s infinite`;

        wrap.appendChild(tri);
    }

    // Add event listener for mouse movement to move triangles away from the cursor
    document.addEventListener('mousemove', function(e) {
        const triangles = document.querySelectorAll('.tri');
        triangles.forEach(triangle => {
            const rect = triangle.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {  // Move away if cursor is within 150px of triangle
                const angle = Math.atan2(dy, dx);
                const offsetX = Math.cos(angle) * -50;
                const offsetY = Math.sin(angle) * -50;
                triangle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        });
    });
});
// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function startSpeechRecognition() {
    let mic = document.getElementById('mic');
    mic.classList.add('glowing');  // Add glowing effect when mic is clicked

    recognition.start();

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById('textInput').value = transcript;  // Set input to recognized text
        mic.classList.remove('glowing');  // Remove glowing effect when speech recognition ends
        convertToSign();  // Convert speech to sign language
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        mic.classList.remove('glowing');  // Remove glowing effect in case of error
    };

    recognition.onend = function() {
        mic.classList.remove('glowing');  // Remove glowing effect when recognition stops
    };
}
