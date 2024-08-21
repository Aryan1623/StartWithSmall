'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'add', 'next']; // Removed 'play' option
    this.carouselData = [
      {
        'id': '1',
        'content': '<div class="carousel-content"><h1>Our Vision</h1><p>We are building a platform where individuals progress together, fostering a supportive ecosystem driven by impactful collaboration. 🌱 It is about community, not just profits. Join us in shaping a future where everyone succeeds! 🚀✨</p></div>',
      },
      {
        'id': '2',
        'content': '<div class="carousel-content"><div><h1>Join Us!!</h1><p>Set sail on a voyage of discovery! 🚀 Join our circle of innovators and let your dreams take wing. Register, meet the criteria, and together, we’ll soar to success! 🌟🛫</p></div></div>',
      },
      {
        "id": "3",
        "content": "<div class=\"carousel-content\"><div><h1>Follow Us!!</h1></div><div class = \"follow\"><div class = \"imgclass\"><img src=\"Untitled(2) 2.svg\" alt=\"\"><p>Check out our first video</p></div><div class=\"socialtags3\"><a href=\"https://www.youtube.com/watch?v=cpoXLj24BDY\" id=\"socioanchor\"><p id=\"socialp\"><img src=\"Group 1171275184.svg\" alt=\"\">/JavascriptKJcoding</p></a><a href=\"https://www.linkedin.com/in/aryan-wattamwar-9b270a219/\" id=\"socioanchor\"><p id=\"socialp\"><img src=\"Group 1171275183.svg\" alt=\"\">/AryanWattamwar</p></a><a href=\"https://www.instagram.com/aryanmadhukarwattamwar/\" id=\"socioanchor\"><p id=\"socialp\"><img src=\"Group 1171275182.svg\" alt=\"\">@AryanWattamwar</p></a><a href=\"https://www.instagram.com/startwithsmall/\" id=\"socioanchor\"><p id=\"socialp\"><img src=\"Group 1171275182.svg\" alt=\"\">@StartwithSmall</p></a></div></div></div>"
      }
      
    ];
    this.carouselInView = [1, 2, 3];
    this.carouselContainer;
    this.carouselDots;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
    this.startAutoSlide(); // Start the auto slide when the carousel is mounted
  }

  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');
    const dots = document.createElement('div');

    this.el.append(container, controls, dots);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';
    dots.className = 'carousel-dots';

    this.carouselData.forEach((item, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.innerHTML = item.content;

      container.append(carouselItem);
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.setAttribute('data-index', `${index + 1}`);
      
      const dot = document.createElement('span');
      dot.className = `carousel-dot carousel-dot-${index + 1}`;
      dot.setAttribute('data-index', `${index + 1}`);
      dots.append(dot);
    });

    this.setControls([...controls.children]);

    this.carouselContainer = container;
    this.carouselDots = dots;
    this.updateDots();
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
    if (control === 'add') return this.add();

    return;
  }

  next() {
    this.carouselData.push(this.carouselData.shift());
    this.carouselInView.unshift(this.carouselInView.pop());

    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    this.carouselData.slice(0, 3).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).innerHTML = data.content;
    });

    this.updateDots();
  }

  updateDots() {
    const dots = this.carouselDots.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[this.carouselInView[0] - 1].classList.add('active');
  }

  startAutoSlide() {
    this.carouselPlayState = setInterval(() => this.next(), 3000);
  }
}

const el = document.querySelector('.carousel');
const exampleCarousel = new Carousel(el);
exampleCarousel.mounted();
