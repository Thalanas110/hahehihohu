export class Poems {
    constructor(dataUrl, gridSelector, modalInstance) {
        this.dataUrl = dataUrl;
        this.grid = document.querySelector(gridSelector);
        this.modal = modalInstance;
        this.poems = [];
    }

    async load() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error('Failed to load poems');
            this.poems = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading poems:', error);
            this.grid.innerHTML = '<p style="text-align:center; color: #ff6666;">Failed to load poems naturally.</p>';
        }
    }

    render() {
        this.grid.innerHTML = ''; // Clear loading state

        this.poems.forEach(poem => {
            const card = document.createElement('article');
            card.classList.add('poem-card');

            // For accessibility
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Read poem: ${poem.title}`);

            const title = document.createElement('h2');
            title.textContent = poem.title;

            const snippet = document.createElement('p');
            snippet.textContent = 'Click to read...';

            card.appendChild(title);
            card.appendChild(snippet);

            // Add click event
            card.addEventListener('click', () => {
                this.modal.open(poem.title, poem.content);
            });

            // Add keyboard support (Enter/Space)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.modal.open(poem.title, poem.content);
                }
            });

            this.grid.appendChild(card);
        });
    }
}
