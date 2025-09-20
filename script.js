// Scroll-based nav highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let cur = '';
    sections.forEach(section => {
        if(window.scrollY >= section.offsetTop - 60) {
            cur = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + cur) {
            link.classList.add('active');
        }
    });
});


// Contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for contacting us!');
            form.reset();
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Toggle course modules
    document.querySelectorAll('.module-header').forEach(header => {
        header.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('collapsed');
            this.classList.toggle('expanded');
        });
    });

    // Toggle teacher collapsibles
    document.querySelectorAll('.teacher-header').forEach(header => {
        header.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('collapsed');
            this.classList.toggle('expanded');
        });
    });

    // Contact form submission (optional)
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for contacting us!');
            form.reset();
        });
    }
});


