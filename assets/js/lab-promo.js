/* Local illustration only. Actual logo upload and pricing happen in Un&Co. Lab. */
(() => {
  document.querySelectorAll('[data-lab-demo]').forEach(demo => {
    const controls = demo.querySelector('[data-lab-controls]');
    const caption = demo.querySelector('[data-lab-caption]');
    if (!controls || !caption) return;
    const productButtons = demo.querySelectorAll('[data-lab-product]');
    const colorButtons = demo.querySelectorAll('[data-lab-color]');
    productButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = button.dataset.labProduct;
        demo.dataset.product = product;
        productButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        caption.textContent = product === 'pin' ? 'Pin con imán y tu logo' : 'Llavero con tu logo';
      });
    });
    colorButtons.forEach(button => {
      button.addEventListener('click', () => {
        demo.dataset.color = button.dataset.labColor;
        colorButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      });
    });
    controls.hidden = false;
  });
})();
