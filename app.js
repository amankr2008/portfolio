document.addEventListener('DOMContentLoaded', () => {
    // Set the initial theme to dark mode
    document.body.classList.add('dark-mode');
    
    const profileIcon = document.getElementById('profileIcon');
    const profileMenu = document.getElementById('profileMenu');
    const themeSwitch = document.getElementById('themeSwitch');
    const hamburger = document.querySelector('.hamburger');
    const menubar = document.querySelector('.menubar');

    window.addEventListener('load', () => {
        const introOverlay = document.getElementById('introOverlay');
        
        // Remove the overlay after the animation completes
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 4000); // Matches the duration of the fadeOut animation (4s)
    });    

    // Toggle profile menu
    profileIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close profile menu if clicked outside
    document.addEventListener('click', (event) => {
        if (!profileMenu.contains(event.target) && event.target !== profileIcon) {
            profileMenu.style.display = 'none';
        }
    });

    // Toggle dark/light mode
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Close the menu when clicking outside of it or on a menu item
    menubar.addEventListener('click', () => {
        menubar.classList.remove('active');
        hamburger.classList.remove('hamburger-active');
    });

    // Toggle Hamburger Menu
    hamburger.addEventListener('click', () => {
        menubar.classList.toggle('active');  
        hamburger.classList.toggle('hamburger-active');  // Toggle animation for hamburger icon
    });
});




const words = ["Developer", "Web Designer", "Coder"];
const colors = ["#FF5733", "#33C1FF", "#28A745"]; 
let currentIndex = 0;

function startSlideshow() {
    const slideshowElement = document.getElementById("slideshow");
    const slideElement = document.createElement("div");
    slideElement.className = "slide";
    slideElement.innerText = words[currentIndex];  // Set initial word
    slideElement.style.color = colors[currentIndex];  // Set initial color
    slideshowElement.appendChild(slideElement);

    setInterval(() => {
        // Slide the current word out
        slideElement.style.transform = 'translateY(100%)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            slideElement.innerText = words[currentIndex];
            slideElement.style.color = colors[currentIndex];  
            slideElement.style.transform = 'translateY(-100%)';  
            
            
            setTimeout(() => {
                slideElement.style.transform = 'translateY(0)'; 
            }, 50);
        }, 500); 
    }, 3000);  
}
document.addEventListener("DOMContentLoaded", startSlideshow);


// Function to create the smoke effect
document.addEventListener('mousemove', (e) => {
    const snitch = document.querySelector('.snitch');
    snitch.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Create the smoke effect
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    smoke.style.left = `${e.clientX - 50}px`; // Adjust to center the smoke effect
    smoke.style.top = `${e.clientY - 50}px`;
    document.body.appendChild(smoke);

    // Remove smoke after animation
    setTimeout(() => {
        smoke.remove();
    }, 500); // Match with the CSS animation duration
});

document.addEventListener('DOMContentLoaded', () => {
    const numStars = 100;
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.opacity = Math.random();
        starsContainer.appendChild(star);
    }
});


