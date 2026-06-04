function toggleMenu() {
  var drawer = document.getElementById("mobile-drawer");
  var overlay = document.getElementById("drawer-overlay");
  var button = document.getElementById("hamburger");

  if (!drawer || !overlay || !button) {
    return;
  }

  var open = drawer.classList.toggle("open");
  button.classList.toggle("open", open);
  overlay.classList.toggle("show", open);
  document.body.classList.toggle("menu-open", open);
}

function closeMenu() {
  var drawer = document.getElementById("mobile-drawer");
  var overlay = document.getElementById("drawer-overlay");
  var button = document.getElementById("hamburger");

  if (drawer) {
    drawer.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

  if (button) {
    button.classList.remove("open");
  }

  document.body.classList.remove("menu-open");
}

function toggleProject(id) {
  var target = document.getElementById("expand-" + id);

  if (!target) {
    return;
  }

  var willOpen = !target.classList.contains("open");

  document.querySelectorAll(".project-expand").forEach(function (section) {
    section.classList.remove("open");
  });

  if (willOpen) {
    target.classList.add("open");
    if (window.location.hash !== "#" + id) {
      window.location.hash = id;
    }
  } else if (window.location.hash === "#" + id) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

function applyRandomBackgrounds() {
  var images = ["img/bg1.png", "img/bg2.png", "img/bg3.png"];
  var targets = Array.from(document.querySelectorAll("[data-random-bg]"));

  if (!targets.length) {
    return;
  }

  var shuffled = images
    .map(function (image) {
      return { image: image, sort: Math.random() };
    })
    .sort(function (left, right) {
      return left.sort - right.sort;
    })
    .map(function (entry) {
      return entry.image;
    });

  targets.forEach(function (target, index) {
    target.style.setProperty("--random-bg-image", 'url("' + shuffled[index % shuffled.length] + '")');
  });
}

function openProjectFromHash() {
  var id = window.location.hash.replace("#", "");

  if (!id) {
    return;
  }

  var target = document.getElementById("expand-" + id);

  if (!target) {
    return;
  }

  document.querySelectorAll(".project-expand").forEach(function (section) {
    section.classList.remove("open");
  });

  target.classList.add("open");
}

document.addEventListener("DOMContentLoaded", function () {
  applyRandomBackgrounds();
  openProjectFromHash();
});

window.addEventListener("hashchange", openProjectFromHash);
