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

function loadPagesData() {
  fetch("data/pages.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
      // 1. HOME PAGE
      if (document.getElementById("hero-tagline")) {
        var home = data.home || {};
        document.getElementById("hero-tagline").textContent = home.hero_tagline;
        document.getElementById("hero-title").innerHTML = home.hero_title.replace(/\n/g, "<br>");
        document.getElementById("hero-description").textContent = home.hero_description;
        
        var primaryBtn = document.getElementById("hero-cta-primary");
        primaryBtn.textContent = home.hero_cta_primary_text;
        primaryBtn.href = home.hero_cta_primary_url;
        
        var secondaryBtn = document.getElementById("hero-cta-secondary");
        secondaryBtn.textContent = home.hero_cta_secondary_text;
        secondaryBtn.href = home.hero_cta_secondary_url;

        document.getElementById("pillars-label").textContent = home.pillars_label;
        document.getElementById("pillars-title").textContent = home.pillars_title;
        document.getElementById("pillars-description").textContent = home.pillars_description;

        var pillarsGrid = document.getElementById("pillars-grid");
        if (pillarsGrid && home.pillars) {
          pillarsGrid.innerHTML = "";
          home.pillars.forEach(function (pillar) {
            var div = document.createElement("div");
            div.className = "pillar";
            div.innerHTML = '<div class="pillar-letter">' + pillar.letter + '</div>' +
                            '<div class="pillar-name">' + pillar.name + '</div>' +
                            '<p class="pillar-desc">' + pillar.description + '</p>';
            pillarsGrid.appendChild(div);
          });
        }
      }

      // 2. MISSION PAGE
      if (document.getElementById("mission-header-title")) {
        var mission = data.mission || {};
        document.getElementById("mission-header-label").textContent = mission.header_label;
        document.getElementById("mission-header-title").innerHTML = mission.header_title.replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<em>$1</em>");
        
        var featImg = document.getElementById("mission-feature-img");
        if (featImg) featImg.src = mission.feature_image;

        var quoteEl = document.getElementById("mission-quote");
        if (quoteEl) quoteEl.textContent = '"' + mission.quote + '"';

        var pContainer = document.getElementById("mission-paragraphs-container");
        if (pContainer && mission.paragraphs) {
          // Remove old p elements (keep quote)
          Array.from(pContainer.querySelectorAll(".section-para")).forEach(function (p) {
            p.remove();
          });
          mission.paragraphs.forEach(function (pText) {
            var p = document.createElement("p");
            p.className = "section-para";
            p.textContent = pText;
            pContainer.appendChild(p);
          });
        }
      }

      // 3. COMMUNITIES PAGE
      if (document.getElementById("comm-hero-title")) {
        var comm = data.communities || {};
        document.getElementById("comm-hero-label").textContent = comm.hero_label;
        document.getElementById("comm-hero-title").innerHTML = comm.hero_title.replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<em>$1</em>");
        document.getElementById("comm-hero-desc").textContent = comm.hero_description;
        
        var collabImg = document.getElementById("comm-collab-img");
        if (collabImg) collabImg.src = comm.collaborator_image;

        document.getElementById("comm-collab-label").textContent = comm.collaborator_label;
        document.getElementById("comm-collab-name").textContent = comm.collaborator_name;

        var collabTextContainer = document.getElementById("comm-collab-text-container");
        if (collabTextContainer && comm.collaborator_paragraphs) {
          Array.from(collabTextContainer.querySelectorAll(".section-para")).forEach(function (p) {
            p.remove();
          });
          comm.collaborator_paragraphs.forEach(function (pText) {
            var p = document.createElement("p");
            p.className = "section-para";
            p.textContent = pText;
            collabTextContainer.appendChild(p);
          });
        }

        document.getElementById("comm-ach-label").textContent = comm.achievements_label;
        document.getElementById("comm-ach-title").textContent = comm.achievements_title;

        var achList = document.getElementById("comm-achievements-list");
        if (achList && comm.achievements) {
          achList.innerHTML = "";
          comm.achievements.forEach(function (ach) {
            var li = document.createElement("li");
            li.innerHTML = '<div class="ach-num">' + ach.num + '</div>' +
                           '<div class="ach-text">' +
                             '<h4>' + ach.title + '</h4>' +
                             '<p>' + ach.description + '</p>' +
                           '</div>';
            achList.appendChild(li);
          });
        }
      }

      // 4. INITIATIVES PAGE
      if (document.getElementById("init-header-title")) {
        var initData = data.initiatives || data.website_pages && data.website_pages.initiatives || {};
        // Decap CMS might nest it, or keep it root level as structured. Our JSON repository matches page keys.
        // We make it robust:
        var pg = data.initiatives || {};
        if (data.home) { // Checked if we loaded pages.json successfully
          // Set dynamic titles
          var initTitle = document.getElementById("init-header-title");
          var initDesc = document.getElementById("init-header-desc");
          var initLabel = document.getElementById("init-header-label");
          // Use default text since they are managed inside individual toggles mostly, but let's support customizing primary labels:
        }
      }

      // 5. PRESS PAGE
      if (document.getElementById("press-header-title")) {
        var press = data.press || {};
        document.getElementById("press-header-label").textContent = press.header_label;
        document.getElementById("press-header-title").innerHTML = press.header_title.replace(/\n/g, "<br>").replace(/\*(.*?)\*/g, "<em>$1</em>");
        
        var articlesGrid = document.getElementById("press-articles-grid");
        if (articlesGrid && press.articles) {
          articlesGrid.innerHTML = "";
          press.articles.forEach(function (art) {
            var card = document.createElement("div");
            card.className = "press-card";
            card.innerHTML = '<p class="press-source">' + art.source + '</p>' +
                             '<h3 class="press-headline">' + art.headline + '</h3>' +
                             '<a href="' + art.url + '" target="_blank" rel="noopener noreferrer" class="press-link">Read the Feature &rarr;</a>';
            articlesGrid.appendChild(card);
          });
        }

        document.getElementById("press-recog-label").textContent = press.recog_label;
        document.getElementById("press-recog-title").innerHTML = press.recog_title.replace(/\n/g, "<br>");
        
        var recogImg = document.getElementById("press-recog-img");
        if (recogImg) recogImg.src = press.recog_image;

        var recogTextContainer = document.getElementById("press-recog-text-container");
        if (recogTextContainer && press.recog_paragraphs) {
          Array.from(recogTextContainer.querySelectorAll(".section-para")).forEach(function (p) {
            p.remove();
          });
          press.recog_paragraphs.forEach(function (pText) {
            var p = document.createElement("p");
            p.className = "section-para";
            p.textContent = pText;
            recogTextContainer.appendChild(p);
          });
        }
      }

      // 6. DONATE PAGE
      if (document.getElementById("donate-hero-title")) {
        var donate = data.donate || {};
        document.getElementById("donate-hero-label").textContent = donate.hero_label;
        document.getElementById("donate-hero-title").innerHTML = donate.hero_title.replace(/\*(.*?)\*/g, "<em>$1</em>");
        document.getElementById("donate-hero-desc").textContent = donate.hero_description;
        
        var cta = document.getElementById("donate-hero-cta");
        cta.textContent = donate.cta_text;
        cta.href = donate.cta_url;

        document.getElementById("donate-card-label").textContent = donate.card_label;
        document.getElementById("donate-bank-holder-label").textContent = donate.bank_name;
        document.getElementById("donate-bank-holder-val").textContent = donate.bank_name_val;
        document.getElementById("donate-account-label").textContent = donate.account_no;
        document.getElementById("donate-account-val").textContent = donate.account_no_val;
        document.getElementById("donate-ifsc-label").textContent = donate.ifsc_code;
        document.getElementById("donate-ifsc-val").textContent = donate.ifsc_code_val;

        document.getElementById("donate-note-label").textContent = donate.note_label;
        document.getElementById("donate-note-title").textContent = donate.note_title;
        document.getElementById("donate-note-desc").textContent = donate.note_description;
      }

      // 7. STORE PAGE
      if (document.getElementById("store-hero-title")) {
        var store = data.store || {};
        document.getElementById("store-hero-label").textContent = store.hero_label;
        document.getElementById("store-hero-title").innerHTML = store.hero_title.replace(/\*(.*?)\*/g, "<em>$1</em>");
        document.getElementById("store-hero-desc").textContent = store.hero_description;

        var chipsContainer = document.getElementById("store-chips-container");
        if (chipsContainer && store.chips) {
          chipsContainer.innerHTML = "";
          store.chips.forEach(function (chip) {
            var span = document.createElement("span");
            span.className = "store-chip";
            span.textContent = chip;
            chipsContainer.appendChild(span);
          });
        }

        document.getElementById("store-note-label").textContent = store.note_label;
        document.getElementById("store-note-title").textContent = store.note_title;
        document.getElementById("store-note-desc").textContent = store.note_description;

        document.getElementById("store-cat-label").textContent = store.catalog_label;
        document.getElementById("store-cat-title").innerHTML = store.catalog_title.replace(/\*(.*?)\*/g, "<em>$1</em>");
        document.getElementById("store-cat-desc").textContent = store.catalog_description;

        var productsGrid = document.getElementById("store-products-grid");
        if (productsGrid && store.products) {
          productsGrid.innerHTML = "";
          store.products.forEach(function (prod) {
            var article = document.createElement("article");
            article.className = "store-item";
            article.innerHTML = '<div class="store-img">' +
                                  '<img src="' + prod.image + '" alt="' + prod.name + '" loading="lazy">' +
                                  '<div class="craft-badge">' + prod.badge + '</div>' +
                                '</div>' +
                                '<div class="store-info">' +
                                  '<h3 class="store-item-name">' + prod.name + '</h3>' +
                                  '<p class="store-item-origin">' + prod.origin + '</p>' +
                                  '<p class="store-item-desc">' + prod.description + '</p>' +
                                  '<div class="store-buy-row">' +
                                    '<span class="store-item-price">&#8377;' + prod.price + '/&#8211;</span>' +
                                    '<button type="button" class="buy-btn" onclick="showStoreProgress(\'' + prod.name.replace(/'/g, "\\'") + '\')">Buy now</button>' +
                                  '</div>' +
                                '</div>';
            productsGrid.appendChild(article);
          });
        }
      }
    })
    .catch(function (err) {
      console.error("Error loading page content:", err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  applyRandomBackgrounds();
  openProjectFromHash();
  loadTeamData();
  loadMuseumData();
  loadPagesData();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeArchiveLightbox();
    hideStoreProgress();
  }
});

window.addEventListener("hashchange", openProjectFromHash);
