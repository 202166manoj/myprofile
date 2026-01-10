 // Check if user is logged in
if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Initialize data structure
let portfolioData = {
    about: {
        name: "Manoj Chathuranga",
        tagline: "Full Stack Web Developer crafting beautiful and functional digital experiences",
        paragraphs: [
            "Hi, I'm Manoj Chathuranga, a passionate Full Stack Developer specialized in the MERN stack (MongoDB, Express.js, React, Node.js).",
            "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge through blog posts and mentoring.",
            "I believe in continuous learning and staying up-to-date with the latest web technologies to deliver cutting-edge solutions for my clients."
        ]
    },
    skills: [],
    experience: [],
    testimonials: [],
    blog: []
};

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        portfolioData = JSON.parse(saved);
    }
    displayAllData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const sections = document.querySelectorAll('.admin-section.active');
    sections.forEach(section => {
        const existing = section.querySelector('.success-message');
        if (existing) existing.remove();
        
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.textContent = '✅ Changes saved successfully!';
        section.insertBefore(msg, section.firstChild.nextSibling);
        
        setTimeout(() => msg.remove(), 3000);
    });
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`${sectionName}-section`).classList.add('active');
    event.target.classList.add('active');
}

// Toggle icon input based on selection
function toggleIconInput() {
    const iconType = document.getElementById('skill-icon-type').value;
    const emojiGroup = document.getElementById('emoji-input-group');
    const imageGroup = document.getElementById('image-input-group');
    
    if (iconType === 'emoji') {
        emojiGroup.style.display = 'block';
        imageGroup.style.display = 'none';
    } else {
        emojiGroup.style.display = 'none';
        imageGroup.style.display = 'block';
    }
}

// About Section
function loadAboutData() {
    document.getElementById('about-name').value = portfolioData.about.name;
    document.getElementById('about-tagline').value = portfolioData.about.tagline;
    document.getElementById('about-p1').value = portfolioData.about.paragraphs[0] || '';
    document.getElementById('about-p2').value = portfolioData.about.paragraphs[1] || '';
    document.getElementById('about-p3').value = portfolioData.about.paragraphs[2] || '';
}

function saveAbout() {
    portfolioData.about = {
        name: document.getElementById('about-name').value,
        tagline: document.getElementById('about-tagline').value,
        paragraphs: [
            document.getElementById('about-p1').value,
            document.getElementById('about-p2').value,
            document.getElementById('about-p3').value
        ]
    };
    saveData();
}

// Skills Section
function addSkill() {
    const name = document.getElementById('skill-name').value;
    const iconType = document.getElementById('skill-icon-type').value;
    
    let icon;
    if (iconType === 'emoji') {
        icon = document.getElementById('skill-icon-emoji').value;
    } else {
        icon = document.getElementById('skill-icon-image').value;
    }
    
    if (!name || !icon) {
        alert('Please fill all fields');
        return;
    }
    
    portfolioData.skills.push({ 
        name, 
        icon, 
        iconType,
        id: Date.now() 
    });
    saveData();
    displaySkills();
    
    // Clear inputs
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-icon-emoji').value = '';
    document.getElementById('skill-icon-image').value = '';
}

function displaySkills() {
    const list = document.getElementById('skills-list');
    list.innerHTML = '';
    
    portfolioData.skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        // Display icon based on type
        let iconDisplay;
        if (skill.iconType === 'image') {
            iconDisplay = `<img src="${skill.icon}" style="width: 40px; height: 40px; object-fit: contain;" alt="${skill.name}">`;
        } else {
            iconDisplay = skill.icon;
        }
        
        card.innerHTML = `
            <div class="item-content">
                <h4>${iconDisplay} ${skill.name}</h4>
                <small style="color: #64748b;">${skill.iconType === 'image' ? '🖼️ Image' : '😀 Emoji'}</small>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteSkill(${skill.id})">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill?')) {
        portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
        saveData();
        displaySkills();
    }
}

// Experience Section
function addExperience() {
    const title = document.getElementById('exp-title').value;
    const company = document.getElementById('exp-company').value;
    const date = document.getElementById('exp-date').value;
    const desc = document.getElementById('exp-desc').value;
    
    if (!title || !date || !desc) {
        alert('Please fill all required fields');
        return;
    }
    
    portfolioData.experience.push({ title, company, date, desc, id: Date.now() });
    saveData();
    displayExperience();
    
    document.getElementById('exp-title').value = '';
    document.getElementById('exp-company').value = '';
    document.getElementById('exp-date').value = '';
    document.getElementById('exp-desc').value = '';
}

function displayExperience() {
    const list = document.getElementById('experience-list');
    list.innerHTML = '';
    
    portfolioData.experience.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-content">
                <h4>${exp.title}${exp.company ? ' at ' + exp.company : ''}</h4>
                <p><strong>${exp.date}</strong></p>
                <p>${exp.desc}</p>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteExperience(${exp.id})">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function deleteExperience(id) {
    if (confirm('Are you sure you want to delete this experience?')) {
        portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
        saveData();
        displayExperience();
    }
}

// Testimonials Section
function addTestimonial() {
    const quote = document.getElementById('test-quote').value;
    const author = document.getElementById('test-author').value;
    const title = document.getElementById('test-title').value;
    
    if (!quote || !author) {
        alert('Please fill all required fields');
        return;
    }
    
    portfolioData.testimonials.push({ quote, author, title, id: Date.now() });
    saveData();
    displayTestimonials();
    
    document.getElementById('test-quote').value = '';
    document.getElementById('test-author').value = '';
    document.getElementById('test-title').value = '';
}

function displayTestimonials() {
    const list = document.getElementById('testimonials-list');
    list.innerHTML = '';
    
    portfolioData.testimonials.forEach(test => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-content">
                <p><em>"${test.quote}"</em></p>
                <h4>- ${test.author}${test.title ? ', ' + test.title : ''}</h4>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteTestimonial(${test.id})">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function deleteTestimonial(id) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        portfolioData.testimonials = portfolioData.testimonials.filter(t => t.id !== id);
        saveData();
        displayTestimonials();
    }
}

// Blog Section
function addBlog() {
    const title = document.getElementById('blog-title').value;
    const date = document.getElementById('blog-date').value;
    const desc = document.getElementById('blog-desc').value;
    
    if (!title || !date || !desc) {
        alert('Please fill all fields');
        return;
    }
    
    portfolioData.blog.push({ title, date, desc, id: Date.now() });
    saveData();
    displayBlog();
    
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-date').value = '';
    document.getElementById('blog-desc').value = '';
}

function displayBlog() {
    const list = document.getElementById('blog-list');
    list.innerHTML = '';
    
    portfolioData.blog.forEach(post => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-content">
                <h4>${post.title}</h4>
                <p><strong>${post.date}</strong></p>
                <p>${post.desc}</p>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteBlog(${post.id})">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        portfolioData.blog = portfolioData.blog.filter(b => b.id !== id);
        saveData();
        displayBlog();
    }
}

// Display all data
function displayAllData() {
    loadAboutData();
    displaySkills();
    displayExperience();
    displayTestimonials();
    displayBlog();
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'index.html';
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', loadData);