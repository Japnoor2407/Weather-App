// ---------------------------------------------------------------------------
// Theme toggle — switches <html> between the default dark theme and the
// light theme defined in style.css under :root[data-theme="light"].
// ---------------------------------------------------------------------------
(function () {
  const STORAGE_KEY = 'skycast-theme';
  const root = document.documentElement;
  const toggleBtn = document.querySelector('.theme');

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    if (toggleBtn) {
      // button always shows the theme you'll switch TO next
      toggleBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  }
})();