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

function setArchiveLightboxImage(src, alt) {
  var image = document.getElementById("archive-lightbox-image");

  if (!image) {
    return;
  }

  image.src = src;
  image.alt = alt;
  image.hidden = false;
}

function renderArchiveLightboxThumbs(images) {
  var thumbs = document.getElementById("archive-lightbox-thumbs");

  if (!thumbs) {
    return;
  }

  thumbs.innerHTML = "";

  if (!images || !images.length) {
    thumbs.style.display = "none";
    return;
  }

  thumbs.style.display = "flex";

  images.forEach(function (image, index) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "archive-lightbox-thumb";
    button.setAttribute("aria-label", "View related image " + (index + 1));
    button.innerHTML = '<img src="' + image.src + '" alt="' + image.alt + '">';
    button.addEventListener("click", function () {
      setArchiveLightboxImage(image.src, image.alt);
      Array.from(thumbs.querySelectorAll(".archive-lightbox-thumb")).forEach(function (thumb) {
        thumb.classList.toggle("active", thumb === button);
      });
    });
    thumbs.appendChild(button);
  });
}

function openArchiveLightbox(tile) {
  var modal = document.getElementById("archive-lightbox");
  var title = document.getElementById("archive-lightbox-title");
  var description = document.getElementById("archive-lightbox-description");

  if (!modal || !tile) {
    return false;
  }

  var tileImage = tile.querySelector("img");
  var src = tile.dataset.archiveSrc || (tileImage ? tileImage.currentSrc || tileImage.src : "");
  var alt = tile.dataset.archiveAlt || (tileImage ? tileImage.alt : "Museum archive image");
  var imageTitle = tile.dataset.archiveTitle || alt;
  var imageDescription = tile.dataset.archiveDescription || "";
  var imagesData = tile.dataset.archiveImages || "";
  var images = [];

  if (!src) {
    return false;
  }

  if (imagesData) {
    images = imagesData.split("|").filter(Boolean).map(function (imagePath) {
      return {
        src: imagePath,
        alt: imagePath.split("/").pop().replace(/\.[^.]+$/, "")
      };
    });
  }

  setArchiveLightboxImage(src, alt);
  renderArchiveLightboxThumbs(images);

  if (title) {
    title.textContent = imageTitle;
  }

  if (description) {
    description.textContent = imageDescription;
    description.style.display = imageDescription ? "block" : "none";
  }

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

  var title = document.getElementById("archive-lightbox-title");
  var description = document.getElementById("archive-lightbox-description");
  var thumbs = document.getElementById("archive-lightbox-thumbs");

  if (title) {
    title.textContent = "";
  }

  if (description) {
    description.textContent = "";
    description.style.display = "none";
  }

  if (thumbs) {
    thumbs.innerHTML = "";
    thumbs.style.display = "none";
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

function loadTeamData() {
  var grid = document.getElementById("team-grid");
  if (!grid) return;

  fetch("data/team.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
      var members = data.members || [];
      grid.innerHTML = "";
      members.forEach(function (member) {
        var card = document.createElement("div");
        card.className = "team-card";
        
        var frame = document.createElement("div");
        frame.className = "founder-photo-frame";
        
        var img = document.createElement("img");
        img.src = member.image;
        img.alt = member.name;
        frame.appendChild(img);
        
        var h3 = document.createElement("h3");
        h3.className = "team-name";
        h3.textContent = member.name;
        
        var pRole = document.createElement("p");
        pRole.className = "team-role";
        pRole.textContent = member.role;
        
        var pBio = document.createElement("p");
        pBio.className = "team-bio";
        pBio.textContent = member.bio;
        
        card.appendChild(frame);
        card.appendChild(h3);
        card.appendChild(pRole);
        card.appendChild(pBio);
        grid.appendChild(card);
      });
    })
    .catch(function (err) {
      console.error("Error loading team data:", err);
    });
}

function loadMuseumData() {
  var grid = document.getElementById("archive-grid");
  if (!grid) return;

  fetch("data/museum.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
      var items = data.items || [];
      grid.innerHTML = "";
      items.forEach(function (item) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "archive-tile";
        button.dataset.archiveSrc = item.image;
        button.dataset.archiveAlt = item.title + " (" + item.category + ")";
        button.dataset.archiveTitle = item.title;
        button.dataset.archiveDescription = item.description;
        if (item.additional_images) {
          button.dataset.archiveImages = item.additional_images;
        }

        var frame = document.createElement("span");
        frame.className = "archive-frame";
        
        var img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title + " (" + item.category + ")";
        img.loading = "lazy";
        frame.appendChild(img);
        
        var meta = document.createElement("span");
        meta.className = "archive-meta";
        
        var h3 = document.createElement("h3");
        h3.textContent = item.title;
        
        var p = document.createElement("p");
        p.textContent = item.category;
        
        meta.appendChild(h3);
        meta.appendChild(p);
        
        button.appendChild(frame);
        button.appendChild(meta);
        
        grid.appendChild(button);
      });
      initMuseumArchivePage();
    })
    .catch(function (err) {
      console.error("Error loading museum data:", err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  applyRandomBackgrounds();
  openProjectFromHash();
  loadTeamData();
  loadMuseumData();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeArchiveLightbox();
    hideStoreProgress();
  }
});

window.addEventListener("hashchange", openProjectFromHash);
