let hamburgerMenu = (() => {
    let hamBtn = document.querySelector('.hamburger-bnt'),
        menuItem = [...document.querySelectorAll('.ham-menu__item')],
        menu = document.body.querySelector('.ham-menu');

    let menuAct = e => {
        let timer = 0;

        if (hamBtn.className === 'hamburger-bnt') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }

        menu.classList.toggle('ham-menu_active');
        hamBtn.classList.toggle('hamburger-bnt_active');

        menuItem.forEach(function(item) {
            
            if (item.className === 'ham-menu__item') {
                setTimeout(function() {
                    item.classList.toggle('ham-menu__item_active')
                }, timer);
                timer += 150;
            } else {
                item.classList.toggle('ham-menu__item_active')
            }
        })
    }


    const handler = () => {
        if (hamBtn) {
            hamBtn.addEventListener('click', menuAct);
        }
    }

    return { handler }
})()

export default hamburgerMenu;