let slider = (() => {
    let leftArr = document.getElementById('leftArr'),
        rightArr = document.getElementById('rightArr'),
        main = document.body.querySelectorAll('.slider__main-list')[1],
        mainTablet = document.body.querySelectorAll('.slider__main-list')[0],
        left = document.body.querySelector('.slider__side-left-list'),
        right = document.body.querySelector('.slider__side-right-list'),
        title = document.body.querySelector('.slider__title'),
        desc = document.body.querySelector('.slider__desc p');

    let titles = ['Сайт 1', 'Сайт 2', 'Сайт 3', 'Сайт 4'],
        descs = ['HTML, CSS', 'HTML5, SCSS, JavaScript', 'HTML5, LESS, ES6', 'HTML5, CSS3, JavaScript'],
        slideCount = 4;

    let positions = {
        main: 1,
        left: 2,
        right: 0
    }

    let changePos = {
        toLeft() {
            positions.right = positions.main;
            positions.main = positions.left;
            if (positions.left === slideCount - 1) {
                positions.left = 0;
            } else {
                positions.left++;
            }
        },
        toRight() {
            positions.left = positions.main;
            positions.main = positions.right;
            if (positions.right === 0) {
                positions.right = slideCount - 1;
            } else {
                positions.right--;
            }
        }
    }

    let slide = () => {
        let transformLeft = `translateY(-${positions.left}00%)`,
            transformRight = `translateY(-${positions.right}00%)`,
            transformMain = `translateY(-${positions.main}00%)`;
        left.style.transform = transformLeft;
        right.style.transform = transformRight;
        if (parseInt(window.innerWidth) > 768) {
            main.style.transform = transformMain;
        } else {
            mainTablet.style.transform = transformMain;
        }
        title.textContent = titles[positions.main];
        desc.textContent = descs[positions.main];
    }

    const handler = () => {
        if (leftArr) {
            leftArr.addEventListener('click', () => {
                changePos.toLeft();
                slide();
            });
    
            rightArr.addEventListener('click', () => {
                changePos.toRight();
                slide();
            });
        }
    }

    return { handler }
})();

export default slider;