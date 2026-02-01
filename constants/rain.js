export class Rain {
    constructor(containerSelector, dropCount = 50) {
        this.container = document.querySelector(containerSelector);
        this.dropCount = dropCount;
        this.drops = [];
    }

    init() {
        if (!this.container) return;

        // Create drops
        for (let i = 0; i < this.dropCount; i++) {
            this.createDrop();
        }
    }

    createDrop() {
        const drop = document.createElement('div');
        drop.classList.add('drop');

        // Randomize position and animation properties
        const left = Math.random() * 100;
        const duration = Math.random() * 1 + 0.5; // between 0.5s and 1.5s
        const delay = Math.random() * 2; // up to 2s delay

        drop.style.left = `${left}%`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.opacity = Math.random() * 0.5 + 0.1; // Vary opacity

        this.container.appendChild(drop);
        this.drops.push(drop);
    }
}
