WebP Support
==============

[![Bower version](https://badge.fury.io/bo/webp-support.svg)](https://badge.fury.io/bo/webp-support)

A pure javascript (no jQuery) lightweight library that checks browser WebP format support and adds 'webp' class to body if supported.

What is WebP? - [Answer](https://developers.google.com/speed/webp/)

## Bower

  ```bash
  bower install --save webp-support
  ```

## Usage

Include the script in your HTML

  ```html
  <script src="bower_components/webp-support/webp.min.js"></script>
  ```

  or import with native JavaScript `import` or CommnJS:

  ```js
  import * from 'webp-support';

  require('webp-support');
  ```

If browser support webp format it'll add the `webp` class to body tag.

Also you can import ES2015 version in your scripts.
