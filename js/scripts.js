/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    highlightCurrentWeek();

});

// Highlight the current week in the lecture schedule. Weeks are read from the
// table itself: every row has a "week-N" class and dated rows show "Mon 02/11/26".
// Append ?today=YYYY-MM-DD to the URL to preview another date.
function highlightCurrentWeek() {
    const schedule = document.querySelector('#weekly-schedule');
    if (!schedule) {
        return;
    }

    const override = new URLSearchParams(window.location.search).get('today');
    const today = override ? new Date(override + 'T12:00:00') : new Date();
    const day = 24 * 60 * 60 * 1000;

    // Earliest date of each week -> Monday 00:00 of that week
    const weekStart = {};
    const rowsByWeek = {};
    schedule.querySelectorAll('tbody tr').forEach(row => {
        const weekClass = [...row.classList].find(c => /^week-\d+$/.test(c));
        if (!weekClass) {
            return;
        }
        (rowsByWeek[weekClass] = rowsByWeek[weekClass] || []).push(row);
        row.querySelectorAll('td').forEach(cell => {
            const m = cell.textContent.trim().match(/^\w{3} (\d{2})\/(\d{2})\/(\d{2})$/);
            if (!m) {
                return;
            }
            const date = new Date(2000 + Number(m[3]), Number(m[2]) - 1, Number(m[1]));
            const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (date.getDay() + 6) % 7);
            if (!weekStart[weekClass] || monday < weekStart[weekClass]) {
                weekStart[weekClass] = monday;
            }
        });
    });

    const current = Object.keys(weekStart).find(w =>
        today >= weekStart[w] && today - weekStart[w] < 7 * day);
    if (!current) {
        return;
    }

    const rows = rowsByWeek[current];
    rows.forEach(row => row.classList.add('current-week'));
    rows[0].id = 'current-week';

    const badge = document.createElement('span');
    badge.className = 'current-week-badge';
    badge.textContent = 'This week';
    rows[0].querySelector('td').appendChild(badge);

    const jump = document.createElement('p');
    jump.className = 'text-center mb-4';
    jump.innerHTML = '<a class="btn btn-primary btn-sm" href="#current-week"><i class="fa-solid fa-calendar-day me-2"></i>Jump to this week</a>';
    schedule.querySelector('.table-responsive').before(jump);

    // The anchor is created only now, so the browser could not scroll to it on load
    if (window.location.hash === '#current-week') {
        rows[0].scrollIntoView();
    }
}