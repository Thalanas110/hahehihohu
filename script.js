import { Rain } from './constants/rain.js';
import { Modal } from './constants/modal.js';
import { Poems } from './constants/poems.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Rain
    // 50 drops for mobile performance balance
    const rain = new Rain('.rain-container', 50);
    rain.init();

    // 2. Initialize Modal
    const modal = new Modal();

    // 3. Initialize Poems
    const poems = new Poems('data/poems.json', '#poem-grid', modal);
    poems.load();
});
