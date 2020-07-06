// Menu
var container = document.querySelector('.container');
var menu = document.querySelector('.menu');
var mobileMenuTrigger = document.querySelector('.menu-trigger');
var desktopMenu = document.querySelector('.menu__inner--desktop');
var desktopMenuTrigger = document.querySelector('.menu__sub-inner-more-tigger');
var menuMore = document.querySelector('.menu__sub-inner-more');
var mobileQuery = getComputedStyle(document.body).getPropertyValue('--phoneWidth');
var isMobile = function() { return window.matchMedia(mobileQuery).matches };
var isMobileMenu = function() {
  mobileMenuTrigger && mobileMenuTrigger.classList.toggle('hidden', !isMobile());
  menu && menu.classList.toggle('hidden', isMobile());
  menuMore && menuMore.classList.toggle('hidden', !isMobile());
};

// Common
menu && menu.addEventListener('click', function(e) { e.stopPropagation() });
menuMore && menuMore.addEventListener('click', function(e) { e.stopPropagation() });

isMobileMenu();

document.body.addEventListener('click', function() {
  if (!isMobile() && menuMore && !menuMore.classList.contains('hidden')) {
    menuMore && menuMore.classList.add('hidden');
  } else if (isMobile() && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
});

window.addEventListener('resize', isMobileMenu);

// Mobile menu
mobileMenuTrigger && mobileMenuTrigger.addEventListener('click', function(e) {
  e.stopPropagation();
  menu && menu.classList.toggle('hidden');
});

// Desktop menu
desktopMenuTrigger && desktopMenuTrigger.addEventListener('click', function(e) {
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
var getTheme = window.localStorage && window.localStorage.getItem('theme');
var themeToggle = document.querySelector('.theme-toggle');
var isDark = getTheme === 'dark';

if (getTheme !== null) {
  document.body.classList.toggle('dark-theme', isDark);
}

themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
  var theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  window.localStorage && window.localStorage.setItem('theme', theme);
});
