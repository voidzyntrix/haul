// Runs before first paint so the page never flashes the wrong theme. Kept tiny and dependency-free.
(function () {
  var root = document.documentElement;
  var pref = null;
  try {
    pref = localStorage.getItem('haul.landing.theme');
  } catch (e) {
    pref = null;
  }
  if (pref !== 'light' && pref !== 'dark') {
    try {
      pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      pref = 'light';
    }
  }
  root.dataset.theme = pref;
  // Lets the CSS hide sections until they scroll in; without script everything simply shows.
  root.classList.add('js');
})();
