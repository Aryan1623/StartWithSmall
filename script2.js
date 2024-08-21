let currentSlidePosition = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function displaySlide(index) {
    // Update active class for the carousel slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active-slide');
        if (i === index) {
            slide.classList.add('active-slide');
        }
    });

    // Update active class for the indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active-indicator');
        if (i === index) {
            indicator.classList.add('active-indicator');
        }
    });

    // Move the carousel track
    document.querySelector('.carousel-track').style.transform = `translateX(-${index * 100}%)`;
}

function advanceSlide() {
    currentSlidePosition = (currentSlidePosition + 1) % totalSlides;
    displaySlide(currentSlidePosition);
}

function goToSlide(index) {
    currentSlidePosition = index;
    displaySlide(currentSlidePosition);
}

setInterval(advanceSlide, 3000); // Automatically move the carousel every 3 seconds
