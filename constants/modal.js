export class Modal {
    constructor() {
        this.overlay = document.querySelector('.modal-overlay');
        this.contentTitle = document.querySelector('.modal-title');
        this.contentBody = document.querySelector('.modal-body');
        this.closeBtn = document.querySelector('.close-btn');

        this.init();
    }

    init() {
        // Close on clicking the close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on clicking outside content
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open(title, content) {
        this.contentTitle.textContent = title;
        this.contentBody.innerHTML = content;

        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling bg
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Optional: clear content after transition
        setTimeout(() => {
            this.contentTitle.textContent = '';
            this.contentBody.innerHTML = '';
        }, 300);
    }

    isOpen() {
        return this.overlay.classList.contains('active');
    }
}
