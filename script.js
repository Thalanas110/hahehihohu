import { Rain } from './constants/rain.js';
import { Modal } from './constants/modal.js';
import { Poems } from './constants/poems.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Rain
    const rain = new Rain('.rain-container', 60); // slightly more rain
    rain.init();

    // 2. Initialize Modal
    const modal = new Modal();

    // 3. Initialize Poems
    const poems = new Poems('data/poems.json', '#poem-grid', modal);
    await poems.load();

    // 4. Setup Controls
    setupControls(poems);
});

function setupControls(poemsInstance) {
    const searchInput = document.getElementById('search-input');
    const filterContainer = document.getElementById('filter-container');

    // Extract unique tags from loaded poems
    const allTags = new Set();
    poemsInstance.poems.forEach(p => p.tags.forEach(t => allTags.add(t)));

    // Create Buttons
    Array.from(allTags).sort().forEach(tag => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.dataset.filter = tag;
        btn.textContent = tag;
        filterContainer.appendChild(btn);
    });

    // Delegated Event for Filters
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');

            // Filter logic
            const filter = e.target.dataset.filter; // 'all' or specific tag
            poemsInstance.setFilter(filter);
        }
    });

    // Search Input
    searchInput.addEventListener('input', (e) => {
        poemsInstance.setSearch(e.target.value);
    });
}
