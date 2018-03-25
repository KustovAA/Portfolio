let flip = (() => {
    let authorizeBtn = document.body.querySelector('.authorize__button'),
        container = document.body.querySelector('.welcome__hero-nav'),
        resume = document.body.querySelector('.resume');

    let flipAuth = () => {
        container.classList.toggle('active');
        authorizeBtn.style.display = 'none';
    }

    let flipResume = () => {
        container.classList.toggle('active');
        authorizeBtn.style.display = 'flex';
    }

    const handler = () => {
        if (resume) {
            authorizeBtn.addEventListener('click', flipAuth);
            resume.addEventListener('click', flipResume);
        }
        
    }

    return { handler }
})();

export default flip;