// --- Shared Mobile Hamburger Menu Toggle ---
(function () {
    var hamburgerBtn = document.getElementById('hamburger-btn');
    var mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    var mobileNavClose = document.getElementById('mobile-nav-close');

    if (!hamburgerBtn || !mobileNavOverlay) return;

    function closeMenu() {
        hamburgerBtn.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMenu() {
        hamburgerBtn.classList.add('open');
        mobileNavOverlay.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    hamburgerBtn.addEventListener('click', function () {
        var isOpen = hamburgerBtn.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMenu);
    }

    // Close on link click
    mobileNavOverlay.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
})();
