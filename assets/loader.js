const Loader = {
    loading: false,
    percentComplete: 0,
    modalEl: null,
    barEl: null,

    showModal() {
        if (this.modalEl) return; // Já existe

        // Modal
        this.modalEl = document.createElement('div');
        this.modalEl.id = 'loader-modal';
        this.modalEl.style.cssText = `
            position: fixed;
            z-index: 9999;
            inset: 0;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Loader Bar
        this.barEl = document.createElement('div');
        this.barEl.style.cssText = `
            width: 300px;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 8px #0001;
        `;

        const progress = document.createElement('div');
        progress.style.cssText = `
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #d8b4fe, #7c3aed);
            transition: width 0.2s;
        `;
        progress.className = 'loader-progress-bar';
        this.barEl.appendChild(progress);

        this.modalEl.appendChild(this.barEl);

        // Insert the modal into the body
        const app = document.getElementById('app');
        if (app) app.appendChild(this.modalEl);
    },

    updateBar(percent) {
        if (this.barEl) {
            const progress = this.barEl.querySelector('.loader-progress-bar');
            if (progress) progress.style.width = `${percent}%`;
        }
    },

    hideModal() {
        if (this.modalEl && this.modalEl.parentNode) {
            this.modalEl.parentNode.removeChild(this.modalEl);
        }
        this.modalEl = null;
        this.barEl = null;
    },

    loadContent({ onProgress, onComplete, onError, onAbort } = {}) {
        this.showModal();
        this.loading = true;
        this.percentComplete = 0;
        this.updateBar(0);

        const loader = new XMLHttpRequest();

        loader.addEventListener('progress', event => {
            if (event.lengthComputable) {
                this.percentComplete = Math.round((event.loaded / event.total) * 100);
                this.updateBar(this.percentComplete);
                if (typeof onProgress === 'function') onProgress(this.percentComplete, event);
            }
        });

        loader.addEventListener('load', () => {
            this.loading = false;
            this.percentComplete = 100;
            this.updateBar(100);
            setTimeout(() => this.hideModal(), 400); // Tiny delay to show completion
            if (typeof onComplete === 'function') onComplete();
        });

        loader.addEventListener('error', () => {
            this.loading = false;
            this.hideModal();
            if (typeof onError === 'function') onError();
        });

        loader.addEventListener('abort', () => {
            this.loading = false;
            this.hideModal();
            if (typeof onAbort === 'function') onAbort();
        });

        loader.open('GET', document.location, true);
        loader.send(null);
    }
};

export default Loader;
