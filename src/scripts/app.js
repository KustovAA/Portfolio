const 
    arrowDown = document.querySelector('.arrow-down'),
    mainSec = document.querySelector('.main');

arrowDown.addEventListener('click', function() {
    document.documentElement.scrollTop = document.body.scrollTop = mainSec.clientHeight;
});