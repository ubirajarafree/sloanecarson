// flapText.js
export function initFlapText(selector = '.flap-text', options = {}) {
  const elements = document.querySelectorAll(selector);
  const characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234567890123456789012345678901234567890123456789';
  const delay = options.delay || 30;
  const steps = options.steps || 40;

  function flapAnimation(el, text) {
    let current = Array(text.length).fill('');
    let step = 0;

    function animateStep() {
      for (let i = 0; i < text.length; i++) {
        current[i] = step < steps
          ? characters[Math.floor(Math.random() * characters.length)]
          : text[i];
      }
      el.textContent = current.join('');
      step++;
      if (step <= steps) setTimeout(animateStep, delay);
    }

    animateStep();
  }

  // elements.forEach(el => {
  //   const finalText = el.getAttribute('data-text') || el.dataset.text || el.dataset.dataText;
  //   let triggered = false;
  //   const observer = new IntersectionObserver((entries, obs) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting && !triggered) {
  //         triggered = true;
  //         flapAnimation(el, finalText);
  //         obs.disconnect();
  //       }
  //     });
  //   }, { threshold: 0.5 });
  //   observer.observe(el);
  // });

  elements.forEach(el => {
    const finalText = el.getAttribute('data-text') || el.dataset.text || el.dataset.dataText;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          flapAnimation(el, finalText);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}
