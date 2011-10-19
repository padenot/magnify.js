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

  function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    // walk up the dom
    while( el != $('body')) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  var original = null;
  var magnified = null;
  var throbber_path = "throbber.svg";

  function compute_scale_factor(img) {
    // Magic number to put a little margin.
    var w = window.innerWidth * 0.7;
    var h = window.innerHeight * 0.7;
    var ratio_vert = h / img.height;
    var ratio_hor = w / img.width;
    return ratio_vert < ratio_hor ? ratio_vert : ratio_hor;
  }

  function dispatch(e) {
    if (e.keyCode == 27) {
      demagnify_image($('.zoomed:not([inremoval=true])'));
    }
  }

  function demagnify_image(zoomed) {
    zoomed.setAttribute("inremoval", "true");
    zoomed.style.opacity = "0";
    if (original) {
      var pos = getOffset(original);
      zoomed.style.width = original.width + "px";
      zoomed.style.height = original.height + "px";
      zoomed.style.left = pos.left + "px";
      zoomed.style.top = pos.top + "px";
    }
    original = null;
    magnified = null;
    setTimeout(function() {
      if (zoomed.parentNode) {
        zoomed.parentNode.removeChild(zoomed);
      }
    }, 1000);
  }

  function get_throbber(on) {
    var p = on.parentNode;
    var t = document.createElement('img');
    t.className = "throbber";
    t.src = throbber_path;
    p.appendChild(t);
  }

  function remove_throbber(t) {
    t.parentNode.removeChild(t);
  }

  function animate(element, zoomed) {
    console.log(element);
    var pos = getOffset(element);
    // Put the image about to be zoomed over the image
    zoomed.style.width = element.width + "px";
    zoomed.style.height = element.height + "px";
    zoomed.style.left = pos.left + "px";
    zoomed.style.top = pos.top + "px";

    $('body').appendChild(zoomed);
    zoomed.setAttribute("magnified", "true");
    magnified = zoomed;
    original = element;

    // Magic
    var ratio = compute_scale_factor(original);
    zoomed.style.width = original.width*ratio + "px";
    zoomed.style.height = original.height*ratio + "px";
    zoomed.style.opacity = "1";
    zoomed.style.left = window.innerWidth / 2 - original.width * ratio / 2 + "px";
    // center on viewport
    zoomed.style.top = window.scrollY + window.innerHeight / 2 - element.height*ratio / 2 + "px";
    zoomed.addEventListener('click', function(e) {
      demagnify_image(e.target);
    }, false);
  }

  function magnify_image(e) {
    // possibly demagnify other images
    if (original !== null && original == e.target) {
      demagnify_image($('.zoomed:not([inremoval=true])'));
      return;
    } else if ($('.zoomed:not([inremoval=true])')) {
      demagnify_image($('.zoomed:not([inremoval=true])'));
    }
    if (magnified !== null) {
      demagnify_image(magnified);
    }

    var or = e.target;
    var zoomed = document.createElement('img');
    zoomed.className = "zoomed";
    if (or.parentNode.tagName == "A") {
      zoomed.src = or.parentNode.href;
      get_throbber(or);
      zoomed.addEventListener('load', function() {
        remove_throbber(or.parentNode.lastChild);
        animate(or, zoomed);
      }, false);
    } else {
      zoomed.src = or.src;
      animate(or, zoomed);
    }
  }

  function preventDefault(e) {
    e.preventDefault();
    return false;
  }
  var images = $$("img:not(.nomagnify)");
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", magnify_image, false);
    images[i].style.cursor = "pointer";
  }

  var images_in_links = $$("a > img:not(.nomagnify)");
  for(i = 0; i < images_in_links.length; i++) {
    images_in_links[i].parentNode.addEventListener("click", preventDefault, false);
    images_in_links[i].addEventListener("click", magnify_image, false);
    images_in_links[i].style.cursor = "pointer";
  }

//  var throbber = document.createElement('img');
 // throbber.src = throbber_path;
  //throbber.style.visibility = "hidden";
  //$('body').appendChild(throbber);

  // Escape closes a magnified image.
  document.addEventListener("keydown", function(e) {
    dispatch(e);
  }, false);
}

