// Countdown Timer Logic
window.addEventListener('sectionsLoaded', () => {
    const targetDate = new Date('May 30, 2026 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
        if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);
            const countdownGrid = document.querySelector('.row.justify-content-center.mb-5.g-2');
            if (countdownGrid) countdownGrid.innerHTML = "<h3 class='text-primary w-100 font-serif'>Acara Telah Berlangsung</h3>";
        }
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});
