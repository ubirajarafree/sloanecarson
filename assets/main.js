import Loader from './loader.js';

new Vue({
    el: '#app',
    data: {
        menuOpen: false,
        scrollY: 0
    },
    computed: {
        scrolled() {
            return this.scrollY > 50;
        },
        navLinkClass() {
            return this.scrolled ? 'text-teal-500 hover:text-purple-500' : 
            this.menuOpen ? 'text-sky-500 hover:text-purple-500' : 
            'text-sky-500 hover:text-purple-500';
        }
    },
    methods: {
        scrollToSection(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            if (this.menuOpen) {
                this.menuOpen = false;
            }
        },
        handleScroll() {
            this.scrollY = window.scrollY;
            const header = document.getElementById('header');
            const branding = document.getElementById('branding');
            const brand = document.getElementById('brand');
            const hamburger = document.getElementById('hamburger');
            const scrolled = this.scrolled;

            gsap.to(header, {
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)',
                boxShadow: scrolled ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                duration: 0.3
            });

            gsap.to(branding, {
                paddingTop: scrolled ? '16px' : '24px',
                paddingBottom: scrolled ? '16px' : '24px',
                duration: 0.3
            });

            gsap.to(brand, {
                fontSize: scrolled ? '1.3rem' : '1.6rem',
                duration: 0.3
            });

            gsap.to(hamburger, {
                scale: scrolled ? 1 : 1.5,
                duration: 0.3
            });
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        showLoader() {
            Loader.loadContent({
                onProgress: () => { },
                onComplete: () => {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            if (window.scrollY > 50) {
                                this.handleScroll();
                            }
                        }, 100);
                    });
                 },
                onError: () => { },
                onAbort: () => { }
            });
        },
    },
    mounted() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        this.showLoader();
    }
});
