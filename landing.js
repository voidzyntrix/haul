// The landing page's only script: the theme switch, the "Get Haul" button for the visitor's platform, and
// sections rising in as they scroll into view. It makes no requests (the page's CSP forbids them anyway).

const THEME_COLORS = { light: '#f3ede2', dark: '#090c11' };
const root = document.documentElement;

function setTheme(theme) {
  // Every colour is a transition; pause them so the swap is one frame instead of hundreds of fades.
  root.classList.add('no-transitions');
  root.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.removeAttribute('media');
    meta.setAttribute('content', THEME_COLORS[theme]);
  });
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('no-transitions')));
}

function initTheme() {
  const button = document.getElementById('btn-theme');
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('haul.landing.theme', next);
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
  });
}

function detectOs() {
  const ua = navigator.userAgent;
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  if (/android/i.test(ua)) return 'android';
  // iPadOS reports itself as a Mac, but a Mac has no touch screen.
  if (/iphone|ipad|ipod/i.test(ua) || (/mac/i.test(platform) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/win/i.test(platform)) return 'windows';
  if (/mac/i.test(platform)) return 'macos';
  if (/linux|x11|cros/i.test(platform)) return 'linux';
  return null;
}

const NAMES = { android: 'Android', windows: 'Windows', macos: 'macOS', linux: 'Linux' };

/** Point the main button straight at this visitor's download, and mark their platform's card. */
function initCta() {
  const os = detectOs();
  const note = document.getElementById('cta-note');
  if (os === 'ios') {
    note.textContent = "iPhone and iPad can't run Haul. Open this page on an Android phone or a computer.";
    note.hidden = false;
    return;
  }
  const card = os && document.querySelector(`.platforms li[data-os="${os}"]`);
  const link = card?.querySelector('a.btn');
  if (!link) return;
  card.classList.add('is-yours');
  const cta = document.getElementById('cta-main');
  cta.href = link.href;
  cta.rel = 'noopener';
  cta.querySelector('span').textContent = `Get Haul for ${NAMES[os]}`;
}

function initReveal() {
  const sections = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    sections.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const seen = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      seen.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  sections.forEach((el) => seen.observe(el));
}

initTheme();
initCta();
initReveal();
