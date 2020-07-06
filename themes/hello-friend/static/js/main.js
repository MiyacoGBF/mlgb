// Menu
const container = document.querySelector('.container');
const menu = document.querySelector('.menu');
const mobileMenuTrigger = document.querySelector('.menu-trigger');
const desktopMenu = document.querySelector('.menu__inner--desktop');
const desktopMenuTrigger = document.querySelector('.menu__sub-inner-more-tigger');
const menuMore = document.querySelector('.menu__sub-inner-more');
const mobileQuery = getComputedStyle(document.body).getPropertyValue('--phoneWidth');
const isMobile = () => window.matchMedia(mobileQuery).matches;
const isMobileMenu = () => {
  mobileMenuTrigger && mobileMenuTrigger.classList.toggle('hidden', !isMobile());
  menu && menu.classList.toggle('hidden', isMobile());
  menuMore && menuMore.classList.toggle('hidden', !isMobile());
};

// Common
menu && menu.addEventListener('click', e => e.stopPropagation());
menuMore && menuMore.addEventListener('click', e => e.stopPropagation());

isMobileMenu();

document.body.addEventListener('click', () => {
  if (!isMobile() && menuMore && !menuMore.classList.contains('hidden')) {
    menuMore && menuMore.classList.add('hidden');
  } else if (isMobile() && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
});

window.addEventListener('resize', isMobileMenu);

// Mobile menu
mobileMenuTrigger && mobileMenuTrigger.addEventListener('click', e => {
  e.stopPropagation();
  menu && menu.classList.toggle('hidden');
});

// Desktop menu
desktopMenuTrigger && desktopMenuTrigger.addEventListener('click', e => {
  e.stopPropagation();
  menuMore && menuMore.classList.toggle('hidden');
  if (
    menuMore &&
    menuMore.getBoundingClientRect().right > container.getBoundingClientRect().right
  ) {
    menuMore.style.left = 'auto';
    menuMore.style.right = 0;
  }
});

// Toggle theme
const getTheme = window.localStorage && window.localStorage.getItem('theme');
const themeToggle = document.querySelector('.theme-toggle');
const isDark = getTheme === 'dark';

if (getTheme !== null) {
  document.body.classList.toggle('dark-theme', isDark);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  window.localStorage && window.localStorage.setItem(
    'theme',
    document.body.classList.contains('dark-theme') ? 'dark' : 'light',
  );
});
