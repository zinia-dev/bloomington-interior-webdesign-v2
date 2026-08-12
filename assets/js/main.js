// BLOOMINGTON INTERIOR — shared site behaviour
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile hamburger menu */
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.classList.toggle('active');
    });
    // On mobile, tapping a top-level link that has a dropdown should expand it first
    document.querySelectorAll('.main-nav .nav-item.has-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          a.parentElement.classList.toggle('dd-open');
        }
      });
    });
  }

  /* Gallery filter tabs (Projects page) */
  var tabs = document.querySelectorAll('.filter-tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var filter = tab.getAttribute('data-filter');
        document.querySelectorAll('[data-category]').forEach(function (block) {
          var cats = (block.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || cats.indexOf(filter) !== -1;
          block.classList.toggle('hidden-item', !show);
        });
      });
    });
  }

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var currentGroup = [];
    var currentIndex = 0;

    function openLightbox(group, index) {
      currentGroup = group;
      currentIndex = index;
      lbImg.src = currentGroup[currentIndex];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function show(delta) {
      currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
      lbImg.src = currentGroup[currentIndex];
    }

    document.querySelectorAll('[data-lightbox-group]').forEach(function (groupEl) {
      var figs = Array.prototype.slice.call(groupEl.querySelectorAll('[data-full]'));
      var urls = figs.map(function (f) { return f.getAttribute('data-full'); });
      figs.forEach(function (fig, i) {
        fig.addEventListener('click', function () { openLightbox(urls, i); });
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', function () { show(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') show(1);
      if (e.key === 'ArrowLeft') show(-1);
    });
  }

  /* Close mobile nav when a plain link is tapped */
  document.querySelectorAll('.main-nav a:not(.nav-item.has-dropdown > a)').forEach(function (a) {
    a.addEventListener('click', function () {
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.classList.remove('active');
      }
    });
  });

  /* Contact form — static front-end only, no backend wired up */
  var form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var note = document.getElementById('form-note');
      if (btn) { btn.textContent = 'Message ready'; }
      if (note) {
        note.textContent = 'This form is a front-end demo only — it is not yet connected to email or a database. Wire it up to a form service (e.g. Formspree) or your backend, or for now please call/WhatsApp/email us directly using the details on this page.';
        note.style.display = 'block';
      }
    });
  }
});
