let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  updateProgressBar(index);
  console.log(`Slide viewed: ${index + 1}`);
}

function updateProgressBar(index) {
  const percentage = ((index + 1) / slides.length) * 100;
  progressBar.style.width = percentage + '%';
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
}


prevBtn.addEventListener('click', () => changeSlide(-1));
nextBtn.addEventListener('click', () => changeSlide(1));


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'f') document.documentElement.requestFullscreen();
  if (e.key === 'Escape') document.exitFullscreen();
});


let wheelCooldown = false;
document.addEventListener('wheel', (e) => {
  if (wheelCooldown) return;
  wheelCooldown = true;

  if (e.deltaY > 0) changeSlide(1);
  else if (e.deltaY < 0) changeSlide(-1);

  setTimeout(() => wheelCooldown = false, 300);
});


let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].clientX;
}, false);

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, false);

function handleSwipe() {
  const threshold = 50;
  const diff = startX - endX;

  if (diff > threshold) changeSlide(1);
  else if (diff < -threshold) changeSlide(-1);
}


setInterval(() => {
  changeSlide(1);
}, 10000); 

showSlide(currentSlide);
