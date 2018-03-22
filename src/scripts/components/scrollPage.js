let scrollPage = (() => {
    let arrowDown = document.body.querySelector('.arrow-down'),
        targetSection = document.body.querySelectorAll('.section')[1],
        startSection = document.body.querySelectorAll('.section')[0];
        

    let animate = options => {
        let start = performance.now(),
            distance = Math.ceil(targetSection.getBoundingClientRect().top),
            heightRatio = distance / startSection.clientHeight,
            duration = options.duration * heightRatio;

        
        requestAnimationFrame(function animate(time) {
            let timeFraction;

            if ((time - start) / duration > (1 - heightRatio)) {
                timeFraction = (time - start) / duration;
            } else {
                timeFraction = 1 - heightRatio;
            }

            if (timeFraction > 1) timeFraction = 1;
            
            let progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    
        
    const handler = () => { 
        arrowDown.addEventListener('click', e => {
            let start = performance.now();
            animate({
                duration: 1000,
                timing: function(timeFraction) {
                    return timeFraction;
                },
                draw: function(progress) {
                    window.scrollTo(0, progress * (startSection.clientHeight+1));
                }
            });
        })
    }

    return { handler }
        
})();

export default scrollPage;