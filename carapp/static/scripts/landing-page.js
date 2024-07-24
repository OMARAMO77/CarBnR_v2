const menuLinks = document.querySelectorAll('nav a');

menuLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = document.getElementById(link.hash.slice(1));
    smoothScrollTo(targetSection);
  });
});

function smoothScrollTo(target) {
  const start = window.scrollY;
  const distance = target.offsetTop - start;
  const duration = 1000;

  let startTimestamp = null;

  function animate(currentTime) {
    if (startTimestamp === null) startTimestamp = currentTime;
    const progress = currentTime - startTimestamp;
    const easeInOutQuad = progress => progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const newY = start + easeInOutQuad(progress / duration) * distance;
    window.scrollTo(0, newY);
    if (progress < duration) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
