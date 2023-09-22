let sections = document.querySelectorAll('.Section');
let turnInitiated = Array(sections.length).fill(false);
let currentSectionIndex = 0; 

sections.forEach((section, i) => {
    let flipbookEL = section.querySelector('.flipbook');
    let flipbookContainerInnerEL = section.querySelector('.flipbook-container-inner');
    let coverImageEL = section.querySelector('.cover-image');
    let exitButtonEL = section.querySelector('.exit-button');
    let purchaseButtonEL = section.querySelector('.purchase-button');
    let infoContainerEL = section.querySelector('.info-container');
    

    
    if (!(flipbookEL && flipbookContainerInnerEL && coverImageEL && exitButtonEL && purchaseButtonEL && infoContainerEL)) {
        return;
    }

    coverImageEL.classList.add('cover-image-hover');  // Add the hover effect initially
    // Show info container and purchase button on page load
    infoContainerEL.style.display = 'block'; 
    purchaseButtonEL.style.display = 'block';


    let coverImageClickHandler = function (e) {
      if (coverImageEL.classList.contains('disabled')) {
        return;
      }
      coverImageEL.classList.remove('cover-image-hover'); 
      currentSectionIndex = i;
      
      // Start the scaling animation
      coverImageEL.style.transition = 'transform 0.5s';
      coverImageEL.style.transform = 'scale(2)'; 
      document.body.style.overflow = 'hidden';
     document.documentElement.style.overflow = 'hidden';
     document.body.style.position = 'fixed';
     let maxWidth = 1710; // Set the maximum width to prevent distortion
     let aspectRatio = 1654 / 2339; // Adjust this value based on your content's aspect ratio
     
     let width, height;
     
     if (window.innerWidth >= 1440) { // Large screens (Desktops, large laptops)
         width = Math.min(window.innerWidth * 0.8, maxWidth);
         height = width * aspectRatio;
     } else if (window.innerWidth >= 1024) { // Medium screens (Laptops, tablets in landscape mode)
         width = window.innerWidth * 0.9;
         height = width * aspectRatio;
     } else if (window.innerWidth >= 768) { // Small screens (Tablets in portrait mode)
         width = window.innerWidth * 0.95;
         height = width * aspectRatio;
     } else { // Extra small screens (Phones)
         width = window.innerWidth * 0.95;
         height = width * aspectRatio;
     }
     
     // Ensure the height does not exceed 95% of the viewport height
     if (height > window.innerHeight * 0.95) {
         height = window.innerHeight * 0.95;
         width = height / aspectRatio; // Calculate the width based on the new height
     }
     
    
      // Wait for the animation to complete before hiding the cover image and showing the flipbook
      setTimeout(function() {
          // Hide cover image
          coverImageEL.style.display = 'none'; 

          coverImageEL.classList.add('disabled');
          // Hide info container and purchase button
          infoContainerEL.style.display = 'none'; 
          purchaseButtonEL.style.display = 'none';
    
          // Show flipbook
          flipbookEL.style.display = 'block';
        
          // Animate flipbook to fullscreen
          flipbookContainerInnerEL.style.width = '100%';
          flipbookContainerInnerEL.style.height = '100vh';
          
          //Flipbook Notification 
          let noticeEL = section.querySelector('.flipbook-notice');
          noticeEL.style.display = 'block';
    
          // Show exit button
          exitButtonEL.style.display = 'block';
    
          // Remove this click event listener
          coverImageEL.removeEventListener('click', coverImageClickHandler);
    
          // Calculate the size for the flipbook
    
          // Initialize turn.js on flipbook only once
          if (!turnInitiated[i]) {
            $(flipbookEL).turn({
              autoCenter: true,
              width: width,
              height: height,
              zoom: 2  // zoom in by 2x
            });
                  
            turnInitiated[i] = true;
          } else {
            $(flipbookEL).turn('page', 1);
          }
          
          $(flipbookEL).turn('size', width, height);  // set the size of the flipbook
      }, 500);  // Wait 500ms (0.5s) for the animation to complete
    
      // Hide flipbook notification after 5 seconds
      setTimeout(function() {
        let noticeEL = section.querySelector('.flipbook-notice');
        noticeEL.style.display = 'none';
      }, 3500);
    }
    
    coverImageEL.addEventListener('click', coverImageClickHandler);
  
      window.addEventListener('resize', function (e) {
        let maxWidth = 1710;
        let aspectRatio = 1654 / 2339; 
        
        let width, height;
        
        if (window.innerWidth >= 1440) { // Large screens (Desktops, large laptops)
            width = Math.min(window.innerWidth * 0.8, maxWidth);
            height = width * aspectRatio;
        } else if (window.innerWidth >= 1024) { // Medium screens (Laptops, tablets in landscape mode)
            width = window.innerWidth * 0.9;
            height = width * aspectRatio;
        } else if (window.innerWidth >= 768) { // Small screens (Tablets in portrait mode)
            width = window.innerWidth * 0.95;
            height = width * aspectRatio;
        } else { // Extra small screens (Phones)
            width = window.innerWidth * 0.95;
            height = width * aspectRatio;
        }
        
        // Ensure the height does not exceed 95% of the viewport height
        if (height > window.innerHeight * 0.95) {
            height = window.innerHeight * 0.95;
            width = height / aspectRatio; // Calculate the width based on the new height
        }
        

        
        // Check if flipbookEL exists and is visible
        if (flipbookEL && $(flipbookEL).is(":visible")) {
            $(flipbookEL).turn('size', width, height);  // set the size of the flipbook
            $(flipbookEL).turn('zoom', 2);  // zoom in by 2x
        }
    });

  
    exitButtonEL.addEventListener('click', function (e) {
      // Hide flipbook
      flipbookEL.style.display = 'none';
    
      // Scale down the cover image and then show it
      coverImageEL.style.transform = 'scale(1)';
      coverImageEL.style.display = ''; // Show the cover image
      coverImageEL.style.opacity = '0'; // Set its opacity to 0 initially to hide it
      document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.position = '';


    
      // Wait for the transition to complete before making the cover image visible
      setTimeout(function() {
        coverImageEL.style.transition = 'opacity 0.5s';
        coverImageEL.style.opacity = '1'; // Fade in the cover image
    
        // Re-attach the click event listener to the cover image
        coverImageEL.addEventListener('click', coverImageClickHandler);
    
        // Remove the 'disabled' class from the cover image
        coverImageEL.classList.remove('disabled');
    
        // Add the 'cover-image-hover-enabled' class to the cover image
        coverImageEL.classList.add('cover-image-hover-enabled');
      }, 500);  // Wait 500ms (0.5s) for the scale transition to complete
    
      // Show info container and purchase button
      infoContainerEL.style.display = 'block'; 
      purchaseButtonEL.style.display = 'block'; 
    
      // Hide exit button
      exitButtonEL.style.display = 'none';
      noticeEL.style.display = 'none';
    
      let noticeEL = section.querySelector('.flipbook-notice');
      noticeEL.style.display = 'none';
      
      // Scroll to the top of the current section
      section.scrollIntoView({behavior: "smooth"});
    });
    
    
  });


  window.onload = function() {
    // Get the middle position of the stationary span
    const stationarySpan = document.querySelector(".parallax-container span:nth-child(3)");
    const rect = stationarySpan.getBoundingClientRect();
    const stationaryX = rect.left + window.scrollX;
    const stationaryY = rect.top + window.scrollY;

    // Initial setup
    document.querySelectorAll(".parallax-container span").forEach((shift, index) => {
        if (index !== 2) {
            // Calculate the initial position relative to the stationary span
            const x = shift.getBoundingClientRect().left - stationaryX;
            const y = shift.getBoundingClientRect().top - stationaryY;
            // Store the initial position in data attributes
            shift.dataset.initialX = x;
            shift.dataset.initialY = y;
            // Apply the initial transformation
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`; 
        }
    });
}


// On mousemove
document.querySelector(".hero-wrap").addEventListener("mousemove", parallax);
function parallax(event) {
    this.querySelectorAll(".parallax-container span").forEach((shift, index) => {
        // Exclude the middle span 
        if (index !== 2) {
            const position = shift.getAttribute("value");
            // Get the initial position from data attributes
            const initialX = parseFloat(shift.dataset.initialX);
            const initialY = parseFloat(shift.dataset.initialY);
            const x = initialX + ((window.innerWidth / 2 - event.pageX * position) / 20);
            const y = initialY + ((window.innerHeight / 2 - event.pageY * position) / 20);
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
}

// On mouseleave
document.querySelector(".hero-wrap").addEventListener("mouseleave", function(event) {
    this.querySelectorAll(".parallax-container span").forEach((shift, index) => {
        // Exclude the middle span
        if (index !== 2) { 
            shift.style.transition = 'transform 0.5s'; // Add transition
            // Get the initial position from data attributes
            const x = parseFloat(shift.dataset.initialX);
            const y = parseFloat(shift.dataset.initialY);
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
});


//Navigation Bar JS
// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Hide navbar when entering flipbook mode
document.querySelectorAll(".cover-image").forEach((coverImage) => {
    coverImage.addEventListener("click", function() {
      document.querySelector("#navbar").classList.add("hidden");
    });
  });
  
  // Show navbar when exiting flipbook mode
  document.querySelectorAll(".exit-button").forEach((exitButton) => {
    exitButton.addEventListener("click", function() {
      document.querySelector("#navbar").classList.remove("hidden");
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        let navLink = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      });
    }, {threshold: 0.5});  // 0.5 means the callback will be executed when half of the section is in the viewport
    
    let newSections = document.querySelectorAll('section');
    newSections.forEach(section => {
      observer.observe(section);
    });
});

document.addEventListener('keydown', function(e) {
  // Get the current flipbook element
  let flipbookEL = sections[currentSectionIndex].querySelector('.flipbook');

  if (flipbookEL.style.display !== 'none') { // Only turn pages when the flipbook is visible
      switch(e.keyCode) {
          case 37: // left arrow key
              $(flipbookEL).turn('previous');
              break;
          case 39: // right arrow key
              $(flipbookEL).turn('next');
              break;
      }
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const sidebar = document.getElementById('navbar');
  const navLinks = sidebar.querySelectorAll('a');

  hamburgerMenu.addEventListener('click', toggleSidebar);

  // Close the sidebar when any nav link is clicked
  navLinks.forEach(link => {
      link.addEventListener('click', toggleSidebar);
  });

  function toggleSidebar() {
      if (sidebar.style.right === '0px' || sidebar.classList.contains('open')) {
          sidebar.style.right = '-100vw';
          sidebar.classList.remove('open');
      } else {
          sidebar.style.right = '0px';
          sidebar.classList.add('open');
      }
  }
});


window.onload = function() {
  // Ensure all images have loaded
  $('.gallery').imagesLoaded(function() {
      // Now initialize Masonry
      $('.gallery').masonry({
          itemSelector: '.gallery-item',
          percentPosition: true,
          columnWidth: '.gallery-item'
      });
  });
};

$(document).ready(function() {
  $('.gallery').imagesLoaded(function() {
      $('.gallery').masonry({
          itemSelector: '.gallery-item',
          percentPosition: true,
          columnWidth: '.gallery-item'
      });

      // Manually initialize lightbox
      $('[data-lightbox="gallery"]').lightbox();
  });
});

