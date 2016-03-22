((window, document, undefined) => {
  'use strict';

  const rippleParentClass = 'js-ripple';
  const rippleClass = 'ripple-ink';
  const animateClass = `${rippleClass}_animate`;

  const detectAnimationEvent = () => {
    let eventName;
    let el = document.createElement('fakeelement');

    const animationEndEvents = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };

    for (eventName in animationEndEvents) {
      if (el.style[eventName]) {
        document.removeChild(el);
        return animationEndEvents[eventName];
      }
    }
  };

  const getInkPosition = element => {
    let de = document.documentElement;
    let box = element.getBoundingClientRect();
    let top = box.top + pageYOffset - de.clientTop;
    let left = box.left + pageXOffset - de.clientLeft;

    return {top: top, left: left};
  };

  const deactivateInk = event => event.target.classList.remove(animateClass);

  const rippleHandler = event => {
    let element = event.target;
    let ripple = element.querySelector(`.js-${rippleClass}`);
    let size;
    let x;
    let y;
    let offsets;

    if (ripple) {
      if (!ripple.offsetHeight && !ripple.offsetWidth) {
          size = Math.max(element.offsetWidth, element.offsetHeight);
          ripple.style.width = ripple.style.height = size + 'px';
        }

        x = event.pageX;
        y = event.pageY;

        offsets = getInkPosition(element);
        ripple.style.top = (y - offsets.top - size / 2) + 'px';
        ripple.style.left = (x - offsets.left - size / 2) + 'px';

        ripple.classList.add(animateClass);
    }
  };

  const createInks = () => {
    let parents = document.querySelectorAll(`.${rippleParentClass}`);
    const eventName = detectAnimationEvent();

    if (parents) {
      Array.prototype.forEach.call(parents, parent => {
        let color = parent.getAttribute('data-ripple-color');
        let ripple = document.createElement('span');

        ripple.className = `${rippleClass} js-${rippleClass}`;

        if (color) {
          rippe.style.backgroundColor = color;
        }

        parent.appendChild(ripple);

        parent.addEventListener('click', rippleHandler);
        ripple.addEventListener(eventName, deactivateInk);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', createInks);

})(window, document, undefined);
