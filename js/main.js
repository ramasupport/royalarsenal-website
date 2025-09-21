// RAMA Website Main JavaScript

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Dismiss promo bar
function dismissPromo() {
    const promoBar = document.getElementById('promo-bar');
    if (promoBar) {
        promoBar.style.display = 'none';
        localStorage.setItem('promoDismissed', 'true');
    }
}

// Check if promo was dismissed
if (localStorage.getItem('promoDismissed') === 'true') {
    const promoBar = document.getElementById('promo-bar');
    if (promoBar) {
        promoBar.style.display = 'none';
    }
}

// Smooth scroll to form
function scrollToForm() {
    const form = document.getElementById('trial-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        
        // Update button icon
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('svg path');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        }
    }
}

// Form validation and submission
function validateForm(form) {
    const phone = form.querySelector('input[name="phone"]');
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Phone validation
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Email validation
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('border-red-500');
}

function clearErrors(input) {
    input.classList.remove('border-red-500');
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Enhanced form submission with better UX
function handleFormSubmit(event) {
    console.log('Form submission intercepted');
    
    // Validate form - only prevent submission if validation fails
    if (!validateForm(event.target)) {
        event.preventDefault();
        console.log('Form validation failed');
        // Scroll to first error
        const firstError = event.target.querySelector('.error-message');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show enhanced loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Add success animation after a delay (simulating processing)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('bg-green-500');
        submitBtn.innerHTML = '✓ Submitted Successfully!';
        
        // Show success message
        showEnhancedSuccessMessage();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.classList.remove('bg-green-500');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
    
    console.log('Form validation passed, submitting to:', event.target.action);
}

function showEnhancedSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-2xl z-50 animate-slideInUp';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <span class="text-lg">✓</span>
            </div>
            <div>
                <div class="font-semibold">Success!</div>
                <div class="text-sm opacity-90">We'll contact you within 24 hours</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 text-xl">×</button>
        </div>
    `;
    document.body.appendChild(successDiv);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => successDiv.remove(), 300);
        }
    }, 6000);
}

// Enhanced form validation with better UX
function validateFormField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous errors
    clearErrors(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (fieldType === 'tel' && value && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
        showError(field, 'Please enter a valid phone number');
        return false;
    }
    
    // Age validation
    if (fieldName === 'age' && value) {
        const age = parseInt(value);
        if (age < 5 || age > 17) {
            showError(field, 'Age must be between 5 and 17 years');
            return false;
        }
    }
    
    return true;
}

function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

// Timetable filter functionality
function filterTimetable(filter) {
    const rows = document.querySelectorAll('#timetable tbody tr');
    const buttons = document.querySelectorAll('[onclick^="filterTimetable"]');
    
    // Update button styles
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(filter)) {
            btn.classList.remove('bg-gray-200', 'text-brand-secondary');
            btn.classList.add('bg-brand-primary', 'text-white');
        } else {
            btn.classList.remove('bg-brand-primary', 'text-white');
            btn.classList.add('bg-gray-200', 'text-brand-secondary');
        }
    });
    
    // Filter individual time slots
    rows.forEach(row => {
        const timeslots = row.querySelectorAll('td[data-program]');
        let hasMatchingSlot = false;
        
        // Check each time slot in the row
        timeslots.forEach(slot => {
            const program = slot.dataset.program;
            
            if (filter === 'all') {
                // Show all slots
                slot.style.opacity = '1';
                slot.style.backgroundColor = '';
                hasMatchingSlot = true;
            } else if (program === filter) {
                // Highlight matching slots
                slot.style.opacity = '1';
                slot.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'; // Light brand color
                hasMatchingSlot = true;
            } else if (program === '') {
                // Empty slots - dim them when filtering
                slot.style.opacity = '0.3';
                slot.style.backgroundColor = '';
            } else {
                // Non-matching slots - dim them
                slot.style.opacity = '0.3';
                slot.style.backgroundColor = '';
            }
        });
        
        // Show/hide entire row based on whether it has matching slots
        if (filter === 'all' || hasMatchingSlot) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize timetable to show all rows and slots
function initTimetable() {
    // Ensure all rows and slots are visible by default
    const rows = document.querySelectorAll('#timetable tbody tr');
    rows.forEach(row => {
        row.style.display = '';
        
        // Reset all time slots
        const timeslots = row.querySelectorAll('td[data-program]');
        timeslots.forEach(slot => {
            slot.style.opacity = '1';
            slot.style.backgroundColor = '';
        });
    });
    
    // Set "All Classes" button as active by default
    const buttons = document.querySelectorAll('[onclick^="filterTimetable"]');
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes('all')) {
            btn.classList.remove('bg-gray-200', 'text-brand-secondary');
            btn.classList.add('bg-brand-primary', 'text-white');
        } else {
            btn.classList.remove('bg-brand-primary', 'text-white');
            btn.classList.add('bg-gray-200', 'text-brand-secondary');
        }
    });
}

// Make function globally available
window.filterTimetable = filterTimetable;

// Initialize video player
function initVideo() {
    // Initialize hero background video
    const heroVideo = document.querySelector('section video[autoplay]');
    if (heroVideo) {
        heroVideo.addEventListener('loadstart', () => console.log('Hero Video: Load started'));
        heroVideo.addEventListener('canplay', () => {
            console.log('Hero Video: Can play');
            heroVideo.play().catch(e => console.log('Hero Video autoplay prevented:', e));
        });
        heroVideo.addEventListener('error', (e) => {
            console.error('Hero Video error:', e);
        });
    }
    
    // Initialize main video section
    const video = document.querySelector('#videos-section video');
    if (!video) return;
    
    // Add event listeners for debugging
    video.addEventListener('loadstart', () => console.log('Video: Load started'));
    video.addEventListener('loadeddata', () => console.log('Video: Data loaded'));
    video.addEventListener('canplay', () => console.log('Video: Can play'));
    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        console.error('Video error details:', video.error);
    });
    
    // Try to load the video
    video.load();
}

// Initialize RAMA Carousel
function initCarousel() {
    const carousel = document.getElementById('rama-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(0);
}

// Load testimonials from JSON
async function loadTestimonials() {
    try {
        // Detect language and load appropriate testimonials
        const currentLang = document.documentElement.lang || 'en';
        const testimonialsFile = currentLang === 'ar' ? 'js/testimonials-ar.json' : 'js/testimonials.json';
        
        const response = await fetch(testimonialsFile);
        const data = await response.json();
        const testimonialsContainer = document.getElementById('testimonials-container');
        
        if (!testimonialsContainer) return;
        
        testimonialsContainer.innerHTML = '';
        
        data.testimonials.slice(0, 3).forEach((testimonial, index) => {
            const delay = (index + 1) * 100;
            const initial = testimonial.name.charAt(0).toUpperCase();
            const isArabic = currentLang === 'ar';
            
            // Create star rating with Material Icons
            let starsHTML = '';
            for (let i = 0; i < testimonial.rating; i++) {
                starsHTML += '<span class="material-icons text-yellow-400">star</span>';
            }
            
            const testimonialHTML = `
                <div class="bg-white rounded-xl p-6 shadow-lg" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="flex items-center mb-4 ${isArabic ? 'flex-row-reverse' : ''}">
                        <div class="flex text-yellow-400 text-lg">
                            ${starsHTML}
                        </div>
                        <span class="${isArabic ? 'mr-2' : 'ml-2'} text-sm text-gray-500">${testimonial.rating}.0</span>
                    </div>
                    <p class="text-gray-700 mb-4 ${isArabic ? 'text-right' : 'text-left'}">
                        "${testimonial.text}"
                    </p>
                    <div class="flex items-center ${isArabic ? 'flex-row-reverse' : ''}">
                        <div class="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
                            ${initial}
                        </div>
                        <div class="${isArabic ? 'mr-3' : 'ml-3'}">
                            <div class="font-semibold text-sm ${isArabic ? 'text-right' : 'text-left'}">${testimonial.name}</div>
                            <div class="text-xs text-gray-500 ${isArabic ? 'text-right' : 'text-left'}">${isArabic ? 'ولي أمر راما' : 'RAMA Parent'}</div>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsContainer.innerHTML += testimonialHTML;
        });
        
        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Fallback to existing content if JSON fails to load
    }
}

// Testimonials slider
function initTestimonialsSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-brand-primary');
            } else {
                dot.classList.remove('bg-brand-primary');
                dot.classList.add('bg-gray-300');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    // Initialize
    showSlide(0);
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Add navigation buttons if they exist
    const nextBtn = document.getElementById('testimonial-next');
    const prevBtn = document.getElementById('testimonial-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Add dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
}

// Gallery lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTestimonials(); // Load testimonials from JSON
    initTimetable(); // Initialize timetable display
    initVideo(); // Initialize video player
    initCarousel(); // Initialize RAMA carousel
    initTestimonialsSlider();
    initGallery();
    
    // Advanced enhancements
    initAdvancedAnimations();
    initLazyLoading();
    initParallaxEffects();
    initInteractiveElements();
    initAdvancedFormValidation();
    initMapHandling();
    initLanguageSwitching();
    initDarkTheme();
    
    // Add event listeners for form inputs
    const trialForm = document.getElementById('trial-form');
    const enrollmentForm = document.getElementById('enrollment-form');
    
    // Handle trial form
    if (trialForm) {
        trialForm.addEventListener('submit', handleFormSubmit);
        
        // Clear errors on input
        trialForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => clearErrors(input));
        });
    }
    
    // Handle enrollment form
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleFormSubmit);
        
        // Clear errors on input
        enrollmentForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => clearErrors(input));
        });
    }
    
    // Mobile menu event listener
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Initialize gallery
    initializeGallery();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize mobile swipe gestures
    initMobileSwipeGestures();
    
    // Add loading animation to page
    document.body.classList.add('loaded');
    
    // Initialize animated counters
    initAnimatedCounters();
});

// Gallery functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-brand-primary', 'text-white');
                btn.classList.add('bg-white', 'text-brand-primary');
            });
            this.classList.add('active', 'bg-brand-primary', 'text-white');
            this.classList.remove('bg-white', 'text-brand-primary');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close lightbox on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox on background click
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Back to top functionality
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'fixed bottom-20 right-6 bg-brand-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-brand-accent transition-all duration-300 transform hover:scale-110 z-30 opacity-0 pointer-events-none';
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced mobile menu with swipe gesture
function initMobileSwipeGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe from right edge to open menu
        if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50 && startX > window.innerWidth - 50) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

// Animated counters functionality
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    const achievementsSection = document.getElementById('achievements-section');
    
    if (!counters.length || !achievementsSection) return;
    
    let hasAnimated = false;
    
    // Create intersection observer to trigger animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    
    observer.observe(achievementsSection);
    
    function animateCounters() {
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            // Add delay based on index for staggered animation
            setTimeout(() => {
                const timer = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                        
                        // Add a subtle bounce effect when counter reaches target
                        counter.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            counter.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            }, index * 200); // Stagger each counter by 200ms
        });
    }
}

// Enhanced counter with easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Advanced Animations System
function initAdvancedAnimations() {
    // Intersection Observer for advanced animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add bounce-in animation to cards
                if (element.classList.contains('card-enhanced')) {
                    element.classList.add('bounce-in');
                }
                
                // Add slide animations based on position
                if (element.classList.contains('slide-left')) {
                    element.classList.add('slide-in-left');
                }
                
                if (element.classList.contains('slide-right')) {
                    element.classList.add('slide-in-right');
                }
                
                // Add glow effect to important elements
                if (element.classList.contains('glow-on-scroll')) {
                    element.classList.add('glow-effect');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animations
    document.querySelectorAll('.card-enhanced, .slide-left, .slide-right, .glow-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
}

// Lazy Loading System
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Show loading skeleton
                img.classList.add('loading-skeleton');
                
                // Load the actual image
                const actualImg = new Image();
                actualImg.onload = function() {
                    img.src = this.src;
                    img.classList.remove('loading-skeleton');
                    img.classList.add('bounce-in');
                };
                actualImg.src = img.dataset.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Interactive Elements Enhancement
function initInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-enhanced').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Enhanced hover effects for cards
    document.querySelectorAll('.card-enhanced').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Advanced Form Validation
function initAdvancedFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Remove existing error states
    field.classList.remove('error', 'success');
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Apply validation styles
    if (isValid && value) {
        field.classList.add('success');
        showFieldFeedback(field, 'Valid!', 'success');
    } else if (!isValid) {
        field.classList.add('error');
        showFieldFeedback(field, errorMessage, 'error');
    }
    
    return isValid;
}

function showFieldFeedback(field, message, type) {
    // Remove existing feedback
    const existingFeedback = field.parentNode.querySelector('.field-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create new feedback element
    const feedback = document.createElement('div');
    feedback.className = `field-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        font-size: 0.875rem;
        margin-top: 0.25rem;
        color: ${type === 'error' ? '#ef4444' : '#10b981'};
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    field.parentNode.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
}

// Dark Theme Functionality
function initMapHandling() {
    const mapIframe = document.querySelector('.map-iframe-container iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            console.log('Google Maps iframe loaded successfully');
        });
        
        mapIframe.addEventListener('error', function() {
            console.error('Google Maps iframe failed to load');
            // Show fallback
            const fallback = document.querySelector('.map-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                mapIframe.style.display = 'none';
            }
        });
        
        // Check if iframe loaded after a timeout
        setTimeout(() => {
            if (!mapIframe.contentDocument && !mapIframe.contentWindow) {
                console.warn('Google Maps may be blocked or failed to load');
            }
        }, 3000);
    }
}

function initLanguageSwitching() {
    // Detect current language from URL or HTML lang attribute
    const currentLang = document.documentElement.lang || 'en';
    console.log('Current language:', currentLang);
    
    // Store language preference
    localStorage.setItem('preferred-language', currentLang);
    
    // Add RTL class for Arabic
    if (currentLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('font-arabic');
    }
    
    // Language switching functionality
    const languageSwitchers = document.querySelectorAll('[href*="index.html"], [href*="index-ar.html"]');
    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            const targetLang = this.href.includes('-ar.html') ? 'ar' : 'en';
            localStorage.setItem('preferred-language', targetLang);
            
            // Add smooth transition effect
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0.8';
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 200);
        });
    });
}

function initDarkTheme() {
    // Check for saved theme preference or default to DARK mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    console.log('Initializing dark theme, saved theme:', savedTheme);
    
    // Find the navigation container and add theme toggle
    const nav = document.querySelector('nav');
    console.log('Found nav:', nav);
    
    if (nav) {
        // Find the right side container with the "Book Free Trial" button
        let rightSide = nav.querySelector('.flex.items-center.space-x-4');
        console.log('Found rightSide with space-x-4:', rightSide);
        
        // If not found, try alternative selectors
        if (!rightSide) {
            rightSide = nav.querySelector('.flex.items-center');
            console.log('Found rightSide with items-center:', rightSide);
        }
        
        if (rightSide) {
            // Check if theme toggle already exists
            const existingToggle = rightSide.querySelector('.theme-toggle');
            if (existingToggle) {
                console.log('Theme toggle already exists, removing it');
                existingToggle.remove();
            }
            
            // Create theme toggle button
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = `<span class="material-icons text-lg">${savedTheme === 'dark' ? 'light_mode' : 'dark_mode'}</span>`;
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            themeToggle.title = 'Toggle dark/light mode';
            
            // Add click event listener
            themeToggle.addEventListener('click', toggleTheme);
            
            // Add to navigation (after the Book Free Trial button)
            rightSide.appendChild(themeToggle);
            console.log('Theme toggle added to navigation');
        } else {
            console.log('Could not find right side container in navigation');
        }
    } else {
        console.log('Could not find navigation element');
    }
    
    // Apply dark theme force if already in dark mode
    if (savedTheme === 'dark') {
        setTimeout(() => {
            applyDarkThemeForce();
        }, 100);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add smooth transition effect before refresh
    document.body.style.transition = 'all 0.3s ease';
    document.body.style.opacity = '0.8';
    
    // Refresh the page after a short delay for smooth transition
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function applyDarkThemeForce() {
    // Force all white backgrounds to dark
    const whiteElements = document.querySelectorAll('[class*="bg-white"], section, .py-20, .py-16');
    whiteElements.forEach(element => {
        if (element.classList.contains('bg-white') || 
            element.classList.contains('py-20') || 
            element.classList.contains('py-16') ||
            element.tagName === 'SECTION') {
            element.style.backgroundColor = '#2D2D2D';
            element.style.color = '#FFFFFF';
        }
    });
    
    // Force map container specifically
    const mapContainers = document.querySelectorAll('.map-container, .bg-white.rounded-xl.p-4.shadow-lg, .bg-white.rounded-xl, [data-aos="fade-left"] > div');
    mapContainers.forEach(container => {
        container.style.backgroundColor = '#2D2D2D !important';
        container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        container.style.color = '#FFFFFF';
    });
    
    // Specifically target map container
    const specificMapContainer = document.querySelector('.map-container');
    if (specificMapContainer) {
        specificMapContainer.style.backgroundColor = '#2D2D2D !important';
        specificMapContainer.style.border = '1px solid rgba(255, 255, 255, 0.1) !important';
        specificMapContainer.style.color = '#FFFFFF !important';
    }
    
    // Force all bg-white elements
    const allWhiteElements = document.querySelectorAll('.bg-white');
    allWhiteElements.forEach(element => {
        element.style.backgroundColor = '#2D2D2D !important';
        element.style.color = '#FFFFFF !important';
    });
    
    // Force body background
    document.body.style.backgroundColor = '#1A1A1A';
    document.body.style.color = '#FFFFFF';
}
