// Lines plus a final entry for buttons
const lines = [
    {
        text: "Hi Charlize",
    },
    {
        text: "可愛的，你好嗎?",
    },
    {
        text: "這是我的聖誕節禮物 hehe",
    },
    {
        text: "你還以為我這幾天都在做什麼，小傻瓜",
    },
    {
        text: "anyways, I know chinese is a pain but its so much more romantic",
    },
    {
        text: "I have been planning our date!",
    },
    {
        text: "does 12/23 work for you?",
    },
    {
        text: "actually, I can't see what you responded, just text me lol",
    },
    {
        text: "Yes I know this is nerdy as hell",
    },
    {
        text: "and I would be surprised if you aren't recording by now haha",
    },
    {
        text: "heres a little spoiler of what I have planned ;)",
        images: ["images/christ1.png",
            "images/christ2.png",
            "images/christ3.png",
            "images/coco.png",
            "images/korean.png",
            "images/mall.png",
            "images/skate.png",
            "images/skate1.png"]
    },
    {
        text: "所以，你想和我去約會嗎？",
        images: ["pwease.png"],
        isButtons: true
    }
];

const displayElement = document.getElementById('displayLine');
const imageContainer = document.getElementById('imageContainer');
const buttonsContainer = document.getElementById('buttons');
const contentContainer = document.getElementById('content');
const container = document.getElementById('container');
const landing = document.getElementById('landing');
const startBtn = document.getElementById('startBtn');

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

let currentLineIndex = 0;
const displayDuration = 3000; 
const fadeDuration = 1000;   

startBtn.addEventListener('click', startSequence);

function startSequence() {
    // Fade out landing
    landing.style.opacity = 0;
    setTimeout(() => {
        landing.style.display = 'none';
        
        // Show container and fade it in
        container.style.display = 'block';
        setTimeout(() => {
            container.classList.add('show');
            nextLine();
        }, 50);
    }, fadeDuration);
}

function showContent(lineObj) {
    // Reset content
    displayElement.textContent = "";
    imageContainer.innerHTML = "";
    buttonsContainer.style.display = "none";

    if (lineObj.isButtons) {
        // Show the buttons as the final content
        if (lineObj.text) {
            displayElement.textContent = lineObj.text;
        }

        // Show images if available
        if (lineObj.images && lineObj.images.length > 0) {
            lineObj.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                imageContainer.appendChild(img);
            });
        }
        buttonsContainer.style.display = "block";
        // Buttons are already visible at this point.
        
        // After 0.5s, enable the hover-based movement of the "No" button
        setTimeout(enableNoButtonMovement, 150);
    } else {
        // Show text if available
        if (lineObj.text) {
            displayElement.textContent = lineObj.text;
        }

        // Show images if available
        if (lineObj.images && lineObj.images.length > 0) {
            lineObj.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                imageContainer.appendChild(img);
            });
        }
    }

    // Fade in the content
    contentContainer.classList.add('show');
}

function hideContent() {
    contentContainer.classList.remove('show');
}

function nextLine() {
    if (currentLineIndex >= lines.length) {
        // Sequence is done
        return;
    }

    const lineObj = lines[currentLineIndex];
    showContent(lineObj);

    if (lineObj.isButtons) {
        // Final state: no further lines
        return;
    }

    // After a pause, fade out and move on
    setTimeout(() => {
        hideContent();
        currentLineIndex++;
        setTimeout(() => {
            nextLine();
        }, fadeDuration);
    }, displayDuration);
}

function enableNoButtonMovement() {
    // The no button is now visible on screen.
    // Add event listener so that when user hovers over it, it moves to a random position.
    noButton.addEventListener('mouseover', handleNoButtonHover);
}

function handleNoButtonHover() {
    // Wait 0.5 seconds before moving the button
    setTimeout(moveNoButton, 150);
}

function moveNoButton() {
    const btnWidth = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    // Calculate random coordinates within the viewport
    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Move the button to the new position
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
}
