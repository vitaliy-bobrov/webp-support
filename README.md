WebP Support
==============

[![Bower version](https://badge.fury.io/bo/webp-support.svg)](https://badge.fury.io/bo/webp-support)
[![npm version](https://badge.fury.io/js/webp-detect.svg)](https://badge.fury.io/js/webp-detect)

A pure javascript (no jQuery) lightweight library that checks browser WebP format support and adds 'webp' class to body if supported.

What is WebP? - [Answer](https://developers.google.com/speed/webp/)

## Bower

  ```bash
  bower install --save webp-support
  ```

## npm

  ```bash
  npm install --save webp-detect
  ```

## Usage

Include the script in your HTML

  ```html
  <script src="bower_components/webp-support/webp.min.js"></script>
  ```

  or add to your bundle `import` or CommnJS:

  ```js
  import * from 'webp-detect';

  require('webp-sdetect');
  ```

If browser support webp format it'll add the `webp` class to body tag.

Also you can import ES2015 version in your scripts.
