# magnify.js, because sometimes, bigger is actually better

A little script that magnify thumbnails, using CSS3 transitions and has no
dependancies. It does one thing, but it does it well (I hope). Basically, just
scratching my own itch, I was using FancyZoom in the past and it was buggy, slow
as hell, and not modern at all. It worked on IE, though (but honestly, who cares ?).
This has been tested on Firefox, Chromium and Opera, and works equally well on
those browsers. It should work in any decent Webkit browser (like Safari).

You can see a demo at <http://paul.cx/public/magnify.js/>, that present all the
features :

- Normal magnification ;
- Magnification disabling for an image ;
- Different images between normal and magnified version.

## Usage

Drop that in your template, and all the images will be zoomable on click.

```html
<link type="text/css" rel="stylesheet" href="path/to/magnify.css">
<script type="text/javascript" src="path/to/magnify.js"></script>
<body onload="init_magnify()">
```

If you want an image not to be zoomable, add a `nomagnify` class to it :

```html
<img src="assets/img.jpg" alt="Example." title="Example." class="nomagnify">
```

If you want to show different images (for example a thumbnail and the high-res
version) for the normal image and magnified one :

```html
<a href="path/to/highres.jpg">
  <img src="path/to/thumbnail" alt="Alternative." title="Title.">
</a>
```

## Found a bug ?
Send a patch !

## License

New BSD
