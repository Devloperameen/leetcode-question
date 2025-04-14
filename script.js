
// DOM Elements - Navigation
const homeBtn = document.getElementById('homeBtn');
const coursesBtn = document.getElementById('coursesBtn');
const quizBtn = document.getElementById('quizBtn');
const resourcesBtn = document.getElementById('resourcesBtn');
const exploreBtn = document.getElementById('exploreBtn');

// DOM Elements - Sections
const homeSection = document.getElementById('homeSection');
const coursesSection = document.getElementById('coursesSection');
const quizSection = document.getElementById('quizSection');
const resourcesSection = document.getElementById('resourcesSection');

// DOM Elements - Quote
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// DOM Elements - Quiz
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const resultsContainer = document.getElementById('resultsContainer');
const scoreDisplay = document.getElementById('scoreDisplay');
const scoreMessage = document.getElementById('scoreMessage');
const reviewContainer = document.getElementById('reviewContainer');
const retakeBtn = document.getElementById('retakeBtn');

// Data - Quotes
const quotes = [
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
    { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" }
];

// Data - Quiz Questions
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Multi Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "Python",
            "Java",
            "React",
            "HTML"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the CSS box model?",
        options: [
            "A design pattern for web applications",
            "A layout model that describes content, padding, border, and margin",
            "A JavaScript function for creating boxes",
            "A type of CSS selector"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT a valid CSS selector?",
        options: [
            ".class-name",
            "#id-name",
            "*element",
            ":hover"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of the 'alt' attribute in HTML <img> elements?",
        options: [
            "To define an alternative image if the original cannot be displayed",
            "To provide alternative text for screen readers",
            "To set the alignment of the image",
            "To define the size of the image"
        ],
        correctAnswer: 1
    }
];

// State Variables
let currentQuestionIndex = 0;
let userAnswers = [];

// Navigation Functions
homeBtn.addEventListener('click', () => showSection(homeSection, homeBtn));
coursesBtn.addEventListener('click', () => showSection(coursesSection, coursesBtn));
quizBtn.addEventListener('click', () => {
    showSection(quizSection, quizBtn);
    startQuiz();
});
resourcesBtn.addEventListener('click', () => showSection(resourcesSection, resourcesBtn));
exploreBtn.addEventListener('click', () => showSection(coursesSection, coursesBtn));

// Event Listeners
newQuoteBtn.addEventListener('click', displayRandomQuote);
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);
retakeBtn.addEventListener('click', startQuiz);

// Enroll buttons event listeners
document.querySelectorAll('.enroll-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Enrollment feature coming soon!');
    });
});

// Resource links event listeners
document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Resource access coming soon!');
    });
});

// Footer links event listeners
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = e.target.textContent.toLowerCase();
        
        if (linkText === 'home') {
            showSection(homeSection, homeBtn);
        } else if (linkText === 'courses') {
            showSection(coursesSection, coursesBtn);
        } else if (linkText === 'quiz') {
            showSection(quizSection, quizBtn);
            startQuiz();
        } else if (linkText === 'resources') {
            showSection(resourcesSection, resourcesBtn);
        }
    });
});

// Social links event listeners
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social media integration coming soon!');
    });
});

// Functions
function showSection(section, button) {
    // Hide all sections and remove active class from buttons
    const sections = [homeSection, coursesSection, quizSection, resourcesSection];
    const buttons = [homeBtn, coursesBtn, quizBtn, resourcesBtn];
    
    sections.forEach(s => s.classList.remove('active-section'));
    sections.forEach(s => s.classList.add('hidden-section'));
    buttons.forEach(b => b.classList.remove('active'));
    
    // Show selected section and set active class to button
    section.classList.add('active-section');
    section.classList.remove('hidden-section');
    button.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex].text;
    quoteAuthor.textContent = `- ${quotes[randomIndex].author}`;
    
    // Add animation
    quoteText.classList.add('fade-effect');
    quoteAuthor.classList.add('fade-effect');
    
    setTimeout(() => {
        quoteText.classList.remove('fade-effect');
        quoteAuthor.classList.remove('fade-effect');
    }, 500);
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(undefined);
    
    resultsContainer.classList.add('hidden');
    document.querySelector('.quiz-container').classList.remove('hidden');
    
    displayQuestion();
    updateNavButtons();
    updateProgressBar();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Restore selection if any
    if (userAnswers[currentQuestionIndex] !== undefined) {
        restoreSelectedAnswer();
    }
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    userAnswers[currentQuestionIndex] = index;
    updateNavButtons();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavButtons();
        updateProgressBar();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateNavButtons();
        updateProgressBar();
    }
}

function restoreSelectedAnswer() {
    const savedAnswer = userAnswers[currentQuestionIndex];
    if (savedAnswer !== undefined) {
        const options = document.querySelectorAll('.option');
        options[savedAnswer].classList.add('selected');
    }
}

function updateNavButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === quizQuestions.length - 1 && userAnswers[currentQuestionIndex] !== undefined) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
    
    const allAnswered = userAnswers.every(answer => answer !== undefined);
    if (currentQuestionIndex === quizQuestions.length - 1 && allAnswered) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = !userAnswers[currentQuestionIndex];
    }
    
    nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function submitQuiz() {
    const score = calculateScore();
    
    document.querySelector('.quiz-container').classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    scoreDisplay.textContent = score;
    
    // Set score message
    if (score === quizQuestions.length) {
        scoreMessage.textContent = "Perfect! You're a genius!";
    } else if (score >= quizQuestions.length * 0.8) {
        scoreMessage.textContent = "Excellent! You're doing great!";
    } else if (score >= quizQuestions.length * 0.6) {
        scoreMessage.textContent = "Good job! Keep learning!";
    } else if (score >= quizQuestions.length * 0.4) {
        scoreMessage.textContent = "Not bad, but you can do better!";
    } else {
        scoreMessage.textContent = "Keep studying and try again!";
    }
    
    // Generate review items
    reviewContainer.innerHTML = '';
    quizQuestions.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        
        const isCorrect = userAnswers[index] === question.correctAnswer;
        
        reviewItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p><strong>Your answer:</strong> ${question.options[userAnswers[index]]}</p>
            <p><strong>Correct answer:</strong> ${question.options[question.correctAnswer]}</p>
            <p style="color: ${isCorrect ? 'var(--success-color)' : 'var(--error-color)'}; font-weight: bold;">
                ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </p>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

function calculateScore() {
    return userAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length;
}

// Initialize
displayRandomQuote();

// Add some CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-effect {
        animation: fadeIn 0.5s ease;
    }
</style>
`);
