// Section Loader for Modular HTML
const sections = [
    { id: 'hero-placeholder', file: 'sections/hero.html' },
    { id: 'profile-placeholder', file: 'sections/profile.html' },
    { id: 'family-placeholder', file: 'sections/family.html' },
    { id: 'gallery-placeholder', file: 'sections/gallery.html' },
    { id: 'prayer-placeholder', file: 'sections/prayer.html' },
    { id: 'event-placeholder', file: 'sections/event.html' },
    { id: 'guestbook-placeholder', file: 'sections/guestbook.html' },
    { id: 'footer-placeholder', file: 'sections/footer.html' }
];

const loadSection = async (id, file) => {
    try {
        const resp = await fetch(file);
        if (!resp.ok) throw new Error(`Failed to load ${file}`);
        const html = await resp.text();
        const el = document.getElementById(id);
        if (el) el.outerHTML = html;
    } catch (err) {
        console.error(`Error loading ${file}:`, err);
        // Fallback: If fetch fails (e.g. CORS/Local), maybe the sections directory is accessible differently
        // but for now we just log it.
    }
};

const initApp = async () => {
    console.log("Loading sections...");
    // Load all sections in parallel
    await Promise.all(sections.map(s => loadSection(s.id, s.file)));
    
    console.log("All sections loaded. Dispatched event.");
    window.dispatchEvent(new Event('sectionsLoaded'));
};

// Start loading
document.addEventListener('DOMContentLoaded', initApp);
