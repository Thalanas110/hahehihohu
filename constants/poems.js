export class Poems {
    constructor(dataUrl, gridSelector, modalInstance) {
        this.dataUrl = dataUrl;
        this.grid = document.querySelector(gridSelector);
        this.modal = modalInstance;
        this.poems = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
    }

    async load() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error('Failed to load poems');
            this.poems = await response.json();

            this.initFilters();
            this.render();
        } catch (error) {
            console.error('Error loading poems:', error);
            this.grid.innerHTML = '<p style="text-align:center;">Failed to load poems.</p>';
        }
    }

    initFilters() {
        // dynamic tag generation could happen here if we wanted fully dynamic logic
        // For now, script.js handles the button clicks, updates this class's state
    }

    setFilter(tag) {
        this.currentFilter = tag;
        this.render();
    }

    setSearch(query) {
        this.currentSearch = query.toLowerCase();
        this.render();
    }

    getFilteredPoems() {
        return this.poems.filter(poem => {
            const matchesFilter = this.currentFilter === 'all' || poem.tags.includes(this.currentFilter);
            const matchesSearch = poem.title.toLowerCase().includes(this.currentSearch) ||
                poem.tags.some(t => t.toLowerCase().includes(this.currentSearch));
            return matchesFilter && matchesSearch;
        });
    }

    render() {
        this.grid.innerHTML = '';
        const filtered = this.getFilteredPoems();

        if (filtered.length === 0) {
            this.grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.5;">No poems found.</p>';
            return;
        }

        filtered.forEach((poem, index) => {
            const card = document.createElement('article');
            card.classList.add('poem-card');
            card.style.animation = `fadeIn 0.5s ease backwards ${index * 0.1}s`; // Staggered fade in

            // Accessibility
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Read ${poem.title}`);

            // Tags display
            const tagsDiv = document.createElement('div');
            tagsDiv.classList.add('tags');
            tagsDiv.textContent = poem.tags.join(' • ');

            const title = document.createElement('h2');
            title.textContent = poem.title;

            // Optional "Author/By" line like screenshot
            const myByLine = document.createElement('p');
            myByLine.textContent = 'by Peter Alvarez'; // Placeholder, or remove

            card.appendChild(tagsDiv);
            card.appendChild(title);
            card.appendChild(myByLine);

            card.addEventListener('click', () => {
                this.modal.open(poem.title, poem.content);
            });

            // Keyboard support
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
