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

function magnify_image(e) {
  var src = e.target.src;
  var zoomed = createElement('img', 'zoomed');
  var i = e.target;
  zoomed.src = i.src;
  // Put the image about to be zoomed over the image
  zoomed.style.position = "absolute";
  zoomed.style.width = i.width + "px";
  zoomed.style.height = i.height + "px";
  zoomed.style.left = i.offsetLeft + "px";
  zoomed.style.top = i.offsetTop + "px";

  $('body').appendChild(zoomed);
  zoomed.setAttribute("magnified", "true");

  // Magic
  var ratio = compute_scale_factor(i);
  zoomed.style.width = i.width*ratio + "px";
  zoomed.style.height = i.height*ratio + "px";
  zoomed.style.opacity = "1";
  zoomed.style.left = window.innerWidth / 2 - i.width * ratio / 2 + "px";
  zoomed.style.top = window.innerHeight / 2 - i.height * ratio / 2 + "px";
  zoomed.addEventListener('click', function(e) {
    zoomed.style.opacity = "0";
    zoomed.style.width = i.width + "px";
    zoomed.style.height = i.height + "px";
    zoomed.style.left = i.offsetLeft + "px";
    zoomed.style.top = i.offsetTop + "px";
    setTimeout(function() {
      zoomed.parentNode.removeChild(zoomed);
    }, 1000);
  }, false);
}

function init_magnify() {
  var images = $$("img");
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", magnify_image, false);
  }
}
