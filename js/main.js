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

// Form submission
function handleFormSubmit(event) {
    console.log('Form submission intercepted');
    
    // Validate form - only prevent submission if validation fails
    if (!validateForm(event.target)) {
        event.preventDefault();
        console.log('Form validation failed');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    console.log('Form validation passed, submitting to:', event.target.action);
    
    // Let the form submit naturally to Formspree
    // Formspree will show its default success page
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">✅</span>
            <span>Thank you! We'll contact you soon.</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">×</button>
        </div>
    `;
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
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
    
    // Filter rows
    rows.forEach(row => {
        const programs = row.dataset.program;
        if (filter === 'all' || (programs && programs.includes(filter))) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
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
    initTestimonialsSlider();
    initGallery();
    
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
});
