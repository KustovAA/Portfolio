let blogNavigation = (() => {

    let titles = [...document.body.querySelectorAll('.aside__item-name')],
        articles = [...document.body.querySelectorAll('.blog__article-item')],
        artclOffset = articles.map(article => article.offsetTop),
        sidebar = document.body.querySelector('.aside'),
        main = sidebar ? document.body.querySelector('.main').getBoundingClientRect() : null,
        getSiblings = item => [...item.parentElement.children].filter(el => el != item),
        inScroll = false;


    let getArticle = (position) => {
        if (position <= artclOffset[0]) {
            return 0;
        }

        for (let i = 0; i < artclOffset.length-1; i++) {
            if(position > artclOffset[i] && position < artclOffset[i+1])
                return i;
        }

        return artclOffset.length-1;
    }

    let setActiveTitle = (title) => {
        let actTitle = title.parentElement;
        actTitle.classList.add('active');
        [].forEach.call(getSiblings(actTitle), el => {
            el.classList.remove('active');
        });
    }

    let checkPosition = () => {
        let position = window.pageYOffset;
        if (position <= artclOffset[0] + main.height && sidebar.style.position == 'fixed') {
            sidebar.style.position = 'absolute';
        }
            
        if (position > artclOffset[0] + main.height && sidebar.style.position !== 'fixed') {
            sidebar.style.position = 'fixed';
        }
    
        let data = articles[getArticle(position - 600)].getAttribute('data-section'),
            actTitle = document.body.querySelector(`.aside__item-name[href="#${data}"]`);
        window.location.hash = data;

        if (inScroll) return;

        setActiveTitle(actTitle);
    }

    let scrollToSection = function(e) {
        if (!window.location.hash) return;

        let hash = e ? this.getAttribute('href') : window.location.hash,
            actTitle = document.body.querySelector(`.aside__item-name[href="${hash}"]`),
            actArticle = document.body.querySelector(`.blog__article-item[data-section="${hash.split('#').join('')}"]`),
            ndx = articles.indexOf(actArticle);

        setActiveTitle(actTitle);
        
        let position = (ndx === 0) ? main.height : (artclOffset[ndx] + main.height);
        if (e) {
            animateScroll(e, position);
        } else {
            window.scrollTo(0, position);
        } 
    }

    let animate = (options) => {
        inScroll = true;
        let start = performance.now(),
            startPos = window.pageYOffset;
        requestAnimationFrame(function animate(time) {
        
            let timeFraction = (time - start) / options.duration;
            
            if (timeFraction > 1) {
                timeFraction = 1;
                inScroll = false;
            }
            
            let progress = options.timing(timeFraction);
            options.move(progress, startPos);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }

    let animateScroll = (e, position) => {
        e.preventDefault();

        animate({
            duration: 700,
            timing(timeFraction) {
                return timeFraction;
            },
            move(progress, startPos) {
                window.scrollTo(0, startPos + (position - startPos) * (progress));
            },
        });
    }

    const handler = () => {
        if (sidebar && main) {
            document.body.querySelectorAll('.aside__item')[0].classList.add('active');

            window.addEventListener('scroll', checkPosition);
    
            titles.forEach(el => {
                el.addEventListener('click', scrollToSection);
            })
        }
        
    }

    return { handler }
})();

export default blogNavigation;