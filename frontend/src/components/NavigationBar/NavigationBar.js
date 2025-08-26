/**
 * NavigationBar Component - Sticky navigation with smooth scrolling
 * Features day navigation, current section highlighting, mobile menu
 */

class NavigationBar {
    constructor(navData, containerSelector) {
        this.navData = navData;
        this.container = document.querySelector(containerSelector);
        this.currentSection = null;
        this.isSticky = false;
        this.isMobileMenuOpen = false;
    }

    init() {
        if (!this.container) {
            console.error('Navigation container not found');
            return;
        }
        this.render();
        this.attachEventListeners();
        this.observeSections();
    }

    render() {
        const navItems = this.navData.days.map(day => `
            <li class="nav-item">
                <a href="#${day.id}" class="nav-link" data-section="${day.id}">
                    <span class="nav-day">${day.name}</span>
                    <span class="nav-date">${day.date}</span>
                </a>
            </li>
        `).join('');

        const quickLinks = this.navData.quickLinks ? this.navData.quickLinks.map(link => `
            <li class="nav-item">
                <a href="#${link.id}" class="nav-link nav-quick-link" data-section="${link.id}">
                    ${link.icon} ${link.name}
                </a>
            </li>
        `).join('') : '';

        this.container.innerHTML = `
            <nav class="navigation-bar" id="main-navigation">
                <div class="nav-container">
                    <div class="nav-header">
                        <div class="nav-title">
                            <span class="nav-destination">${this.navData.destination}</span>
                            <span class="nav-dates">${this.navData.dates}</span>
                        </div>
                        <button class="mobile-menu-toggle" aria-label="Toggle menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    
                    <ul class="nav-menu">
                        ${navItems}
                        ${quickLinks ? `<li class="nav-divider"></li>${quickLinks}` : ''}
                    </ul>
                </div>
                
                <div class="nav-progress">
                    <div class="nav-progress-bar"></div>
                </div>
            </nav>
        `;
    }

    attachEventListeners() {
        // Smooth scrolling for navigation links
        const navLinks = this.container.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Mobile menu toggle
        const mobileToggle = this.container.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Sticky navigation on scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = this.container.querySelector('.navigation-bar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after navigation
            if (this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    handleScroll() {
        const navigation = this.container.querySelector('.navigation-bar');
        const scrollPosition = window.pageYOffset;
        const triggerPoint = 200;

        // Sticky navigation
        if (scrollPosition > triggerPoint && !this.isSticky) {
            navigation.classList.add('sticky');
            this.isSticky = true;
        } else if (scrollPosition <= triggerPoint && this.isSticky) {
            navigation.classList.remove('sticky');
            this.isSticky = false;
        }

        // Update progress bar
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / documentHeight) * 100;
        const progressBar = this.container.querySelector('.nav-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }
    }

    observeSections() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, options);

        // Observe all sections
        this.navData.days.forEach(day => {
            const section = document.getElementById(day.id);
            if (section) {
                observer.observe(section);
            }
        });

        // Observe quick link sections
        if (this.navData.quickLinks) {
            this.navData.quickLinks.forEach(link => {
                const section = document.getElementById(link.id);
                if (section) {
                    observer.observe(section);
                }
            });
        }
    }

    setActiveSection(sectionId) {
        // Remove active class from all links
        const navLinks = this.container.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current section link
        const activeLink = this.container.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionId;
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const navigation = this.container.querySelector('.navigation-bar');
        const menuToggle = this.container.querySelector('.mobile-menu-toggle');
        
        if (this.isMobileMenuOpen) {
            navigation.classList.add('mobile-menu-open');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navigation.classList.remove('mobile-menu-open');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        const navigation = this.container.querySelector('.navigation-bar');
        const menuToggle = this.container.querySelector('.mobile-menu-toggle');
        
        navigation.classList.remove('mobile-menu-open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// CSS styles for the navigation bar
const navigationStyles = `
<style>
    /* Navigation Bar Container */
    .navigation-bar {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        position: relative;
        z-index: 1000;
        transition: all 0.3s ease;
    }

    .navigation-bar.sticky {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }

    /* Navigation Container */
    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Navigation Header */
    .nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .nav-title {
        display: flex;
        flex-direction: column;
    }

    .nav-destination {
        font-family: 'Bebas Neue', cursive;
        font-size: 1.8rem;
        color: #4682B4;
        letter-spacing: 2px;
    }

    .nav-dates {
        font-size: 0.9rem;
        color: #666;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 24px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .mobile-menu-toggle span {
        display: block;
        width: 100%;
        height: 3px;
        background: #4682B4;
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translateY(10px);
    }

    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-10px);
    }

    /* Navigation Menu */
    .nav-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 15px 0;
        gap: 30px;
    }

    .nav-item {
        position: relative;
    }

    .nav-divider {
        width: 1px;
        background: #e0e0e0;
        margin: 0 10px;
    }

    /* Navigation Links */
    .nav-link {
        text-decoration: none;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 15px;
        border-radius: 10px;
        transition: all 0.3s ease;
        position: relative;
    }

    .nav-link:hover {
        background: #f8fbff;
        color: #4682B4;
    }

    .nav-link.active {
        background: #4682B4;
        color: white;
    }

    .nav-day {
        font-weight: 600;
        font-size: 1rem;
    }

    .nav-date {
        font-size: 0.8rem;
        opacity: 0.7;
    }

    .nav-quick-link {
        flex-direction: row;
        gap: 8px;
        font-size: 0.9rem;
    }

    /* Progress Bar */
    .nav-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #e0e0e0;
    }

    .nav-progress-bar {
        height: 100%;
        background: #4682B4;
        width: 0;
        transition: width 0.2s ease;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: flex;
        }

        .nav-header {
            border-bottom: none;
        }

        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            gap: 0;
        }

        .mobile-menu-open .nav-menu {
            display: flex;
        }

        .nav-item {
            width: 100%;
        }

        .nav-divider {
            width: 100%;
            height: 1px;
            margin: 15px 0;
        }

        .nav-link {
            width: 100%;
            padding: 15px;
            flex-direction: row;
            justify-content: space-between;
        }

        .nav-link.active {
            background: #f0f9ff;
            color: #4682B4;
        }

        .nav-destination {
            font-size: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .nav-destination {
            font-size: 1.3rem;
        }

        .nav-dates {
            font-size: 0.8rem;
        }
    }
</style>
`;

// Example usage
const navigationExample = `
// Navigation data structure
const navData = {
    destination: "Santa Barbara",
    dates: "March 15-17, 2024",
    days: [
        { id: "saturday", name: "Saturday", date: "Mar 15" },
        { id: "sunday", name: "Sunday", date: "Mar 16" },
        { id: "monday", name: "Monday", date: "Mar 17" }
    ],
    quickLinks: [
        { id: "hotel", name: "Hotel", icon: "🏨" },
        { id: "weather", name: "Weather", icon: "☀️" },
        { id: "map", name: "Map", icon: "🗺️" }
    ]
};

// Initialize navigation
const navigation = new NavigationBar(navData, '#navigation-container');
navigation.init();
`;

export default NavigationBar;
export { navigationStyles };