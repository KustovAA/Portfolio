import parallaxWelcome from './components/parallaxWelcome.js';
import scrollPage from './components/scrollPage.js';
import parallaxMain from './components/parallaxMain.js';
import blur from './components/blur.js';
import hamburgerMenu from './components/hamburgerMenu.js';
import flip from './components/flip.js';

window.onload = function() {
    parallaxWelcome.handler();
    scrollPage.handler();
    parallaxMain.handler();
    blur.handler();
    hamburgerMenu.handler();
    flip.handler();
}