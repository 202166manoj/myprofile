 // Load portfolio data from localStorage
function loadPortfolioData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        const data = JSON.parse(saved);
        updatePortfolioContent(data);
    }
}

// Update portfolio content
function updatePortfolioContent(data) {
    // Update About Section
    if (data.about) {
        const heroName = document.querySelector('.hero h1');
        const heroTagline = document.querySelector('.hero p');
        if (heroName && data.about.name) heroName.textContent = `Hi, I'm ${data.about.name}`;
        if (heroTagline && data.about.tagline) heroTagline.textContent = data.about.tagline;
        
        const aboutTexts = document.querySelectorAll('.about-text p');
        data.about.paragraphs.forEach((text, index) => {
            if (aboutTexts[index] && text) {
                aboutTexts[index].textContent = text;
            }
        });
    }
    
    // Update Skills Section
    if (data.skills && data.skills.length > 0) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = '';
            data.skills.forEach((skill, index) => {
                const skillCard = document.createElement('div');
                skillCard.className = 'skill-card';
                skillCard.style.setProperty('--i', index);
                
                // Check if icon is image URL or emoji
                let iconHTML;
                if (skill.iconType === 'image') {
                    iconHTML = `<img src="${skill.icon}" alt="${skill.name}">`;
                } else {
                    iconHTML = skill.icon;
                }
                
                skillCard.innerHTML = `
                    <div class="skill-icon">${iconHTML}</div>
                    <h3>${skill.name}</h3>
                `;
                skillsGrid.appendChild(skillCard);
            });
        }
    }
    
    // Update Experience Section
    if (data.experience && data.experience.length > 0) {
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.innerHTML = '';
            data.experience.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <h3>${exp.title}${exp.company ? ' at ' + exp.company : ''}</h3>
                    <div class="date">${exp.date}</div>
                    <p>${exp.desc}</p>
                `;
                timeline.appendChild(item);
            });
        }
    }
    
    // Update Testimonials Section
    if (data.testimonials && data.testimonials.length > 0) {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (testimonialsGrid) {
            testimonialsGrid.innerHTML = '';
            data.testimonials.forEach(test => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <p class="testimonial-text">"${test.quote}"</p>
                    <p class="testimonial-author">- ${test.author}${test.title ? ', ' + test.title : ''}</p>
                `;
                testimonialsGrid.appendChild(card);
            });
        }
    }
    
    // Update Blog Section
    if (data.blog && data.blog.length > 0) {
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = '';
            data.blog.forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                card.innerHTML = `
                    <div class="blog-image"></div>
                    <div class="blog-content">
                        <p class="blog-date">${post.date}</p>
                        <h3>${post.title}</h3>
                        <p>${post.desc}</p>
                    </div>
                `;
                blogGrid.appendChild(card);
            });
        }
    }
}

// Handle contact form submission
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Newsletter subscription handler
const newsletterForm = document.querySelector('.footer-newsletter');
if (newsletterForm) {
    const newsletterButton = newsletterForm.querySelector('button');
    const newsletterInput = newsletterForm.querySelector('input');
    
    if (newsletterButton) {
        newsletterButton.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value;
            if (email && email.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s work together!', 'color: #059669; font-size: 14px;');

// Load portfolio data when page loads
window.addEventListener('DOMContentLoaded', loadPortfolioData);