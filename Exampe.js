// // Add any additional JavaScript functionality here
// // Example: Fetching project data from an API or local JSON file
// fetch('projects.json')
//         .then(response => response.json())
//         .then(data => {
//                 const projectsSection = document.querySelector('#projects');
//                 data.projects.forEach(project => {
//                         const projectElement = document.createElement('div');
//                         projectElement.classList.add('project');
//                         projectElement.innerHTML = `
//                 <h2>${project.title}</h2>
//                 <p>${project.description}</p>
//                 <a href="${project.link}" target="_blank">View Project</a>
//             `;
//                         projectsSection.appendChild(projectElement);
//                 });
//         });

// // Scroll Progress Indicator
// const createScrollProgress = () => {
//         const progressBar = document.createElement('div');
//         progressBar.className = 'scroll-progress';
//         document.body.appendChild(progressBar);

//         window.addEventListener('scroll', () => {
//                 const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//                 const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//                 const scrolled = (winScroll / height) * 100;
//                 progressBar.style.width = scrolled + '%';
//         });
// };

// // Theme Switcher
// const initThemeSwitcher = () => {
//         const themeToggle = document.createElement('button');
//         themeToggle.className = 'theme-toggle';
//         themeToggle.innerHTML = '🌓';
//         document.querySelector('.navbar').appendChild(themeToggle);

//         const currentTheme = localStorage.getItem('theme') || 'dark';
//         document.body.className = currentTheme;

//         themeToggle.addEventListener('click', () => {
//                 const newTheme = document.body.className === 'dark' ? 'light' : 'dark';
//                 document.body.className = newTheme;
//                 localStorage.setItem('theme', newTheme);
//         });
// };

// // Project Filtering
// const initProjectFilter = () => {
//         const categories = ['all', 'web', 'ai', 'database'];
//         const filterContainer = document.createElement('div');
//         filterContainer.className = 'project-filters';

//         categories.forEach(category => {
//                 const button = document.createElement('button');
//                 button.textContent = category.toUpperCase();
//                 button.addEventListener('click', () => filterProjects(category));
//                 filterContainer.appendChild(button);
//         });

//         document.querySelector('#projects').prepend(filterContainer);
// };

// const filterProjects = (category) => {
//         const projects = document.querySelectorAll('.project-item');
//         projects.forEach(project => {
//                 if (category === 'all' || project.dataset.category === category) {
//                         project.style.display = 'block';
//                         project.style.animation = 'fadeIn 0.5s ease';
//                 } else {
//                         project.style.display = 'none';
//                 }
//         });
// };

// // Enhanced Form Validation
// const initFormValidation = () => {
//         const form = document.querySelector('#contact-form');
//         if (!form) return;

//         const fields = ['name', 'email', 'message'];

//         fields.forEach(field => {
//                 const input = form.querySelector(`#${field}`);
//                 if (!input) return;

//                 input.addEventListener('input', () => {
//                         validateField(input);
//                 });
//         });

//         form.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 if (validateForm(form)) {
//                         submitForm(form);
//                 }
//         });
// };

// const validateField = (input) => {
//         const field = input.id;
//         const value = input.value.trim();
//         let isValid = true;
//         let errorMessage = '';

//         switch (field) {
//                 case 'email':
//                         isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//                         errorMessage = 'Please enter a valid email address';
//                         break;
//                 case 'name':
//                         isValid = value.length >= 2;
//                         errorMessage = 'Name must be at least 2 characters long';
//                         break;
//                 case 'message':
//                         isValid = value.length >= 10;
//                         errorMessage = 'Message must be at least 10 characters long';
//                         break;
//         }

//         toggleFieldError(input, isValid, errorMessage);
//         return isValid;
// };

// const toggleFieldError = (input, isValid, message) => {
//         const errorElement = input.nextElementSibling?.classList.contains('error-message')
//                 ? input.nextElementSibling
//                 : document.createElement('div');

//         errorElement.className = 'error-message';
//         errorElement.textContent = isValid ? '' : message;

//         if (!input.nextElementSibling?.classList.contains('error-message')) {
//                 input.parentNode.insertBefore(errorElement, input.nextSibling);
//         }

//         input.classList.toggle('invalid', !isValid);
// };

// // Scroll Animations
// const initScrollAnimations = () => {
//         const elements = document.querySelectorAll('.bio-content, .project-item, .skills-section');

//         const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                         if (entry.isIntersecting) {
//                                 entry.target.classList.add('visible');
//                                 observer.unobserve(entry.target);
//                         }
//                 });
//         }, {
//                 threshold: 0.1
//         });

//         elements.forEach(element => {
//                 element.classList.add('fade-in');
//                 observer.observe(element);
//         });
// };

// // Initialize all functionality
// document.addEventListener('DOMContentLoaded', () => {
//         createScrollProgress();
//         initThemeSwitcher();
//         initProjectFilter();
//         initFormValidation();
//         initScrollAnimations();
// });

// // Helper function for smooth scrolling
// const smoothScroll = (target) => {
//         const element = document.querySelector(target);
//         if (!element) return;

//         window.scrollTo({
//                 top: element.offsetTop,
//                 behavior: 'smooth'
//         });
// };

// // Initialize smooth scrolling for all navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 smoothScroll(anchor.getAttribute('href'));
//         });
// });

// Example.js (Fixed and Improved)

// Fetching project data with error handling
fetch('projects.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load project data');
        return response.json();
    })
    .then(data => {
        const projectsSection = document.querySelector('#projects');
        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-item');
            projectElement.dataset.category = project.category;
            projectElement.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            projectsSection.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Error fetching projects:', error));

// Scroll Progress Indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Theme Switcher with Default Dark Mode
const initThemeSwitcher = () => {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    document.querySelector('.navbar').appendChild(themeToggle);

    let currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(currentTheme);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
};

// Project Filtering Fixes
const initProjectFilter = () => {
    const categories = ['all', 'web', 'ai', 'database'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.toUpperCase();
        button.addEventListener('click', () => filterProjects(category));
        filterContainer.appendChild(button);
    });

    document.querySelector('#projects').prepend(filterContainer);
};

const filterProjects = (category) => {
    document.querySelectorAll('.project-item').forEach(project => {
        project.style.display = (category === 'all' || project.dataset.category === category) ? 'block' : 'none';
    });
};

// Scroll Animations
const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.bio-content, .project-item, .skills-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
};

// Initialize all functionality
window.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
    initThemeSwitcher();
    initProjectFilter();
    initScrollAnimations();
});
