import parallaxWelcome from './components/parallaxWelcome.js';
import scrollPage from './components/scrollPage.js';
import parallaxMain from './components/parallaxMain.js';
import blur from './components/blur.js';
import hamburgerMenu from './components/hamburgerMenu.js';
import flip from './components/flip.js';
import slider from './components/slider.js';
import blogNavigation from './components/blogNavigation.js';
import validatorLogin from './components/validatorLogin.js';
import Vue from 'vue'
import App from './App.vue'

window.onload = function() {
    parallaxWelcome.handler();
    scrollPage.handler();
    parallaxMain.handler();
    blur.handler();
    hamburgerMenu.handler();
    flip.handler();
    slider.handler();
    blogNavigation.handler();
    validatorLogin.handler();

    if (document.getElementById('app')) {
        new Vue({
            el: '#app',
            render: h => h(App)
        })
    }
}