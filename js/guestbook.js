// Guestbook Functionality
window.addEventListener('sectionsLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const ucapanList = document.getElementById('ucapan-list');

    let messages = JSON.parse(localStorage.getItem('khitan_premium_messages')) || [];

    const renderMessages = () => {
        if (!ucapanList) return;
        ucapanList.innerHTML = '';
        
        const sortedMessages = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedMessages.forEach((msg) => {
            const item = document.createElement('div');
            item.className = 'msg-bubble mb-3';
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold text-primary font-serif h5 mb-0">${msg.nama}</span>
                    <span class="badge rounded-pill ${msg.status === 'Hadir' ? 'bg-success' : 'bg-secondary'} opacity-75">${msg.status === 'Hadir' ? 'Hadir' : 'Absen'}</span>
                </div>
                <p class="mb-0 text-dark opacity-75 small">"${msg.ucapan}"</p>
            `;
            ucapanList.appendChild(item);
        });
        if (typeof AOS !== 'undefined') AOS.refresh();
    };

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const ucapan = document.getElementById('ucapan').value;
            const status = document.querySelector('input[name="kehadiran"]:checked').value;

            const newMessage = {
                nama,
                ucapan,
                status,
                date: new Date().toISOString()
            };

            messages.push(newMessage);
            localStorage.setItem('khitan_premium_messages', JSON.stringify(messages));
            
            renderMessages();
            guestbookForm.reset();
            
            if (window.Swal) {
                Swal.fire({
                    title: 'Terima Kasih!',
                    text: 'Ucapan & doa Anda telah terkirim.',
                    icon: 'success',
                    confirmButtonColor: '#5B8FB9',
                    background: '#F0F5F9',
                    borderRadius: '25px'
                });
            }
        });
    }

    // Initial render
    renderMessages();
});
