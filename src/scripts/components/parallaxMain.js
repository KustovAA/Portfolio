let parallaxMain = (() => {
    let bg = document.body.querySelector('.main__bg'),
        hero = document.body.querySelector('.hero'),
        layout = document.body.querySelector('.main__layout');

    let move = (block, wScroll, strafeAmount) => {
        let strafe = wScroll / -strafeAmount + 'px',
            transformString = `translate3d(0, ${strafe}, 0)`;

        block.style.transform = transformString;
        block.style.webkitTransform = transformString;
    }

    const handler = () => {
        if (bg) {
            window.onscroll = function() {
                let wScroll = window.pageYOffset;
                move(bg, wScroll, 30);
                move(layout, wScroll, 18);
                move(hero, wScroll, 2.5);
            }
        }
    }

    return { handler }
})();

export default parallaxMain;