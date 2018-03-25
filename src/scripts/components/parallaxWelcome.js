let parallaxWelcome = (() => {
    const container = document.body.querySelector('.welcome__parallax');
    let flag = false;
  
    let bgmove = e => {
        if (flag) return;
        let x = -(e.pageX + e.target.offsetLeft)/2.5,
            y = -(e.pageY + e.target.offsetTop)/2.5;
  
        container.style.backgroundPosition = `${x}px ${y}px`;
        setTimeout(() => flag=false, 420);
    };
  
    const handler = () => {
        if (container) {
            container.addEventListener('mousemove', bgmove);
        }
    }; 
    return {handler}
})();

export default parallaxWelcome;