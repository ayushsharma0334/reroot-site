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

function showStoreProgress(productName) {
  var modal = document.getElementById("store-progress-modal");
  var title = document.getElementById("store-progress-title");
  var body = document.getElementById("store-progress-body");
  var safeName = productName || "This piece";

  if (!modal || !title || !body) {
    window.alert("Feature under progress");
    return false;
  }

  title.textContent = "Feature under progress";
  body.textContent =
    safeName +
    " is ready to preview, but checkout is still under progress. We're finishing the store experience before opening purchases.";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("store-modal-open");

  return false;
}

function hideStoreProgress() {
  var modal = document.getElementById("store-progress-modal");

  if (!modal) {
    return false;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("store-modal-open");

  return false;
}

function openArchiveLightbox(tile) {
  var modal = document.getElementById("archive-lightbox");
  var image = document.getElementById("archive-lightbox-image");

  if (!modal || !image || !tile) {
    return false;
  }

  var tileImage = tile.querySelector("img");
  var src = tile.dataset.archiveSrc || (tileImage ? tileImage.currentSrc || tileImage.src : "");
  var alt = tile.dataset.archiveAlt || (tileImage ? tileImage.alt : "Museum archive image");

  if (!src) {
    return false;
  }

  image.src = src;
  image.alt = alt;
  image.hidden = false;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("archive-lightbox-open");

  var closeButton = document.getElementById("archive-lightbox-close");
  if (closeButton) {
    closeButton.focus();
  }

  return false;
}

function closeArchiveLightbox() {
  var modal = document.getElementById("archive-lightbox");
  var image = document.getElementById("archive-lightbox-image");

  if (!modal) {
    return false;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("archive-lightbox-open");

  if (image) {
    image.src = "";
    image.alt = "";
    image.hidden = true;
  }

  return false;
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

function initMuseumArchivePage() {
  document.querySelectorAll(".archive-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      openArchiveLightbox(tile);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyRandomBackgrounds();
  openProjectFromHash();
  initMuseumArchivePage();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeArchiveLightbox();
    hideStoreProgress();
  }
});

window.addEventListener("hashchange", openProjectFromHash);
