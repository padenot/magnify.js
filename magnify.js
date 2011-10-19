function init_magnify() {
  function $(query, root) {
    if (root)
      return root.querySelector(query);
    return document.querySelector(query);
  }

  function $$(query, root) {
    if (root)
      return root.querySelectorAll(query);
    return document.querySelectorAll(query);
  }

  function createElement(type, className, html) {
    var e = document.createElement(type);
    e.className = className || "";
    e.innerHTML = html || "";
    return e;
  }

  function compute_scale_factor(img) {
    var w = window.innerWidth * 0.9;
    var h = window.innerHeight * 0.9;
    var ratio_vert = h / img.height;
    var ratio_hor = w / img.width;
    return ratio_vert < ratio_hor ? ratio_vert : ratio_hor;
  }

  var original = null;
  var magnified = null;
  function demagnify_image(zoomed) {
    zoomed.setAttribute("inremoval", "true");
    console.log("demagnify");
    zoomed.style.opacity = "0";
    zoomed.style.width = original.width + "px";
    zoomed.style.height = original.height + "px";
    zoomed.style.left = original.offsetLeft + "px";
    zoomed.style.top = original.offsetTop + "px";
    original = null;
    magnified = null;
    setTimeout(function() {
      zoomed.parentNode.removeChild(zoomed);
    }, 1000);
  }

  function magnify_image(e) {
    console.log("magnify");
    // possibly demagnify other images
    if (original == e.target) {
      demagnify_image($('.zoomed:not([inremoval=true])'));
      return;
    } else if (original !== null) {
      demagnify_image($('.zoomed:not([inremoval=true])'));
    }
    if (magnified !== null) {
      demagnify_image(magnified);
    }
    var or = e.target;
    var zoomed = createElement('img', 'zoomed');
    zoomed.src = or.src;
    // Put the image about to be zoomed over the image
    zoomed.style.position = "absolute";
    zoomed.style.width = or.width + "px";
    zoomed.style.height = or.height + "px";
    zoomed.style.left = or.offsetLeft + "px";
    zoomed.style.top = or.offsetTop + "px";

    $('body').appendChild(zoomed);
    zoomed.setAttribute("magnified", "true");
    magnified = zoomed;
    original = e.target;

    // Magic
    var ratio = compute_scale_factor(original);
    zoomed.style.width = original.width*ratio + "px";
    zoomed.style.height = original.height*ratio + "px";
    zoomed.style.opacity = "1";
    zoomed.style.left = window.innerWidth / 2 - original.width * ratio / 2 + "px";
    zoomed.style.top = window.innerHeight / 2 - original.height * ratio / 2 + "px";
    zoomed.addEventListener('click', function(e) {
      demagnify_image(e.target);
    }, false);
  }

  var images = $$("img");
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", magnify_image, false);
  }
}

