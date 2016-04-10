((window, document) => {
  'use strict';

  const rippleClass = 'ripple';
  const inkClass = 'ripple-ink';
  const animateClass = `${inkClass}_animate`;

  /**
   * Detect current browser animationend event name.
   * @return {String} - event name.
   */
  const detectAnimationEvent = () => {
    let eventName;
    let el = document.createElement('fakeelement');

    const animationEndEvents = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd'
    };

    for (eventName in animationEndEvents) {
      if (typeof el.style[eventName] !== 'undefined') {
        return animationEndEvents[eventName];
      }
    }
  };

  /**
   * Deactivate link on animation end.
   * @param {Object} event - object with event data.
   * @return {HTMLElement} - event target.
   */
  const deactivateInk = event => event.target.classList.remove(animateClass);

  /**
   * Ripple effect.
   * @param {Object} event - object with event data.
   */
  const rippleHandler = event => {
    let element = event.target;
    let ripple = element.querySelector(`.${inkClass}`);

    if (ripple) {
      if (!ripple.offsetHeight && !ripple.offsetWidth) {
        ripple.effectSize = Math.max(element.offsetWidth, element.offsetHeight);
        ripple.style.width = ripple.style.height = `${ripple.effectSize}px`;
      }

      ripple.style.top = `${event.offsetY - ripple.effectSize / 2}px`;
      ripple.style.left = `${event.offsetX - ripple.effectSize / 2}px`;

      ripple.classList.add(animateClass);
    }
  };

  /**
   * Initialize ripple elements.
   */
  const createInks = () => {
    let parents = document.querySelectorAll(`.${rippleClass}`);
    const eventName = detectAnimationEvent();

    if (parents) {
      [].forEach.call(parents, parent => {
        let color = parent.getAttribute('data-ripple-color');
        let ripple = document.createElement('span');

        ripple.className = inkClass;

        if (color) {
          ripple.style.backgroundColor = color;
        }

        parent.insertBefore(ripple, parent.firstChild);

        parent.addEventListener('click', rippleHandler);
        ripple.addEventListener(eventName, deactivateInk);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', createInks);
})(window, document);
