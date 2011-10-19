# magnify.js, because sometimes, bigger is actually better

A little script that magnify thumbnails, using CSS3 transitions and has no
dependancies. It does one thing, but it does it well (I hope). Basically, just
scratching my own itch, I was using FancyZoom in the past and it was buggy, slow
as hell, and not modern at all. It worked on IE, though (but honestly, who cares ?).
This has been tested on Firefox, Chromium and Opera, and works equally well on
those browsers. It should work in any decent Webkit browser (like Safari).

You can see a demo at <http://paul.cx/public/magnify.js/>.

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

## Found a bug ?
Send a patch !

## License

New BSD
