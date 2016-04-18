(document => {
  'use strict';

  /**
   * Test webP images support.
   * @param {Function} callback - Callback function.
   */
  const testWepP = callback => {
    let webP = new Image();

    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wA' +
    'iMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = () => {
      callback(webP.height === 2);
    };
  };

  /**
   * Add 'webp' class to body if supported.
   * @param {Boolean} support - WebP format support.
   */
  const addWebPClass = support => {
    if (support) {
      let el = document.body;

      if (el.classList) {
        el.classList.add('webp');
      } else {
        el.className += ' webp';
      }
    }
  };

  document.addEventListener('DOMContentLoaded', testWepP(addWebPClass(support)));
})(document);
