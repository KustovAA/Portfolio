let blur = (() => {
    let wrapper = document.body.querySelector('.form__wrapper'),
        bg = document.body.querySelector('.form__blur');

    const handler = () => {
        if (wrapper) {
            function init() {
                let bgWidth = document.body.querySelector('.feedback').offsetWidth,
                    posLeft = -wrapper.offsetLeft,
                    posTop = -wrapper.offsetTop + 100,
                    blurCSS = bg.style;
    
                blurCSS.backgroundSize = `${bgWidth} auto`;
                console.log(`${bgWidth} auto`);
                blurCSS.backgroundPosition = `${posLeft}px ${posTop}px`;
            }
            window.onresize = init();
            window.onload = init();
        }
    }

    return { handler }
})();

export default blur;