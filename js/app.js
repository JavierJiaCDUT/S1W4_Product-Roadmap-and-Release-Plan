// Configuration Constants
const CONFIG = {
    VELOCITY: {
        MIN: 20,
        MAX: 35,
        INITIAL_DATA: [23, 27, 31, 25, 29, 33],
        INITIAL_LABELS: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6']
    },
    POKER: {
        STORY_CHANGE_DELAY: 5000, // 5 seconds
        FIBONACCI: [1, 2, 3, 5, 8, 13, 21],
        USER_STORIES: [
            "As a user, I want to register an account using email and password.",
            "As a student, I want to search for study materials by course and topic.",
            "As a seller, I want to upload photos of my items with descriptions.",
            "As a buyer, I want to filter search results by price range and condition.",
            "As a user, I want to receive notifications when someone messages me."
        ]
    },
    ANIMATION: {
        LOADING_DELAY: 2000
    }
};

// Utility Functions
const Utils = {
    /**
     * Safely escape HTML to prevent XSS attacks
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Create element with text content (safe from XSS)
     */
    createElementWithText(tag, text, className = '') {
        const element = document.createElement(tag);
        element.textContent = text;
        if (className) element.className = className;
        return element;
    },

    /**
     * Show error message
     */
    showError(container, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.textContent = message;
        container.appendChild(errorDiv);

        // Auto remove after 5 seconds
        setTimeout(() => errorDiv.remove(), 5000);
    },

    /**
     * Generate random velocity
     */
    getRandomVelocity() {
        return Math.floor(Math.random() * (CONFIG.VELOCITY.MAX - CONFIG.VELOCITY.MIN + 1)) + CONFIG.VELOCITY.MIN;
    }
};

// DOM Cache
const DOM = {
    // Navigation
    navButtons: null,
    contentSections: null,

    // Diagram
    diagramItems: null,
    detailsTitle: null,
    detailsContent: null,

    // Velocity Chart
    velocityCanvas: null,
    addSprintButton: null,

    // Planning Poker
    pokerCards: null,
    pokerStory: null,
    pokerResult: null,

    // User Story Generator
    visionInput: null,
    generateStoriesBtn: null,
    generateText: null,
    generateSpinner: null,
    generatedOutput: null,
    outputPlaceholder: null,

    // Release Plan Generator
    releaseGoalInput: null,
    generateReleaseBtn: null,
    generateReleaseText: null,
    generateReleaseSpinner: null,
    generatedReleaseOutput: null,
    releaseOutputPlaceholder: null,

    // PMBOK
    explainRelationshipBtn: null,
    relationshipExplanation: null,
    relationshipContent: null,

    init() {
        // Cache all DOM elements
        this.navButtons = document.querySelectorAll('.nav-button');
        this.contentSections = document.querySelectorAll('.content-section');
        this.diagramItems = document.querySelectorAll('.diagram-item');
        this.detailsTitle = document.getElementById('details-title');
        this.detailsContent = document.getElementById('details-content');
        this.velocityCanvas = document.getElementById('velocityChart');
        this.addSprintButton = document.getElementById('addSprintButton');
        this.pokerCards = document.querySelectorAll('.poker-card');
        this.pokerStory = document.getElementById('poker-story');
        this.pokerResult = document.getElementById('poker-result');
        this.visionInput = document.getElementById('vision-input');
        this.generateStoriesBtn = document.getElementById('generate-stories-btn');
        this.generateText = document.getElementById('generate-text');
        this.generateSpinner = document.getElementById('generate-spinner');
        this.generatedOutput = document.getElementById('generated-output');
        this.outputPlaceholder = document.getElementById('output-placeholder');
        this.releaseGoalInput = document.getElementById('release-goal-input');
        this.generateReleaseBtn = document.getElementById('generate-release-btn');
        this.generateReleaseText = document.getElementById('generate-release-text');
        this.generateReleaseSpinner = document.getElementById('generate-release-spinner');
        this.generatedReleaseOutput = document.getElementById('generated-release-output');
        this.releaseOutputPlaceholder = document.getElementById('release-output-placeholder');
        this.explainRelationshipBtn = document.getElementById('explain-relationship-btn');
        this.relationshipExplanation = document.getElementById('relationship-explanation');
        this.relationshipContent = document.getElementById('relationship-content');
    }
};

// Navigation Module
const Navigation = {
    init() {
        DOM.navButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.switchTab(button));

            // Keyboard navigation
            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    const nextButton = DOM.navButtons[Math.min(index + 1, DOM.navButtons.length - 1)];
                    nextButton.focus();
                } else if (e.key === 'ArrowLeft') {
                    const prevButton = DOM.navButtons[Math.max(index - 1, 0)];
                    prevButton.focus();
                }
            });
        });
    },

    switchTab(button) {
        // Remove active class from all buttons and sections
        DOM.navButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        DOM.contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const targetSection = document.getElementById(button.dataset.target);
        targetSection.classList.add('active');
    }
};

// Roadmap Diagram Module
const RoadmapDiagram = {
    details: {
        'diagram-vision': {
            title: 'Product Vision',
            content: `
                <p><strong>Definition:</strong> A concise statement describing the future state of the product and its value proposition.</p>
                <p><strong>Purpose:</strong> Provides direction and inspiration for all product decisions.</p>
                <p><strong>Example:</strong> "To be the most trusted platform for peer-to-peer learning, connecting students worldwide through interactive study groups."</p>
                <p><strong>Key Elements:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                    <li>Target audience and their needs</li>
                    <li>Unique value proposition</li>
                    <li>Long-term aspirational goals</li>
                    <li>Success metrics and outcomes</li>
                </ul>
            `
        },
        'diagram-roadmap': {
            title: 'Product Roadmap',
            content: `
                <p><strong>Definition:</strong> A strategic document outlining the product's evolution over time.</p>
                <p><strong>Purpose:</strong> Communicates direction, priorities, and progress to stakeholders.</p>
                <p><strong>Time Horizon:</strong> Typically covers 6-18 months with decreasing detail over time.</p>
                <p><strong>Key Components:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                    <li>Themes and initiatives</li>
                    <li>Key milestones and deliverables</li>
                    <li>Resource allocation</li>
                    <li>Dependencies and assumptions</li>
                </ul>
            `
        },
        'diagram-release': {
            title: 'Release Plan',
            content: `
                <p><strong>Definition:</strong> Detailed plan for delivering specific features in a release.</p>
                <p><strong>Purpose:</strong> Bridges strategy with tactical execution.</p>
                <p><strong>Time Horizon:</strong> Typically 2-12 weeks depending on release cycle.</p>
                <p><strong>Key Components:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                    <li>Specific features and user stories</li>
                    <li>Sprint breakdown and timeline</li>
                    <li>Team capacity and velocity</li>
                    <li>Risk mitigation strategies</li>
                </ul>
            `
        }
    },

    init() {
        DOM.diagramItems.forEach(item => {
            item.addEventListener('click', () => this.selectItem(item));

            // Keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectItem(item);
                }
            });
        });
    },

    selectItem(item) {
        // Remove selected class from all items
        DOM.diagramItems.forEach(i => i.classList.remove('selected'));

        // Add selected class to clicked item
        item.classList.add('selected');

        // Update details panel
        const detail = this.details[item.id];
        if (detail) {
            DOM.detailsTitle.textContent = detail.title;
            DOM.detailsContent.innerHTML = detail.content;
        }
    }
};

// Velocity Chart Module
const VelocityChart = {
    chart: null,
    velocityData: [...CONFIG.VELOCITY.INITIAL_DATA],
    sprintLabels: [...CONFIG.VELOCITY.INITIAL_LABELS],

    init() {
        this.createChart();
        DOM.addSprintButton.addEventListener('click', () => this.addSprint());
    },

    createChart() {
        const ctx = DOM.velocityCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.sprintLabels,
                datasets: [{
                    label: 'Story Points Completed',
                    data: this.velocityData,
                    backgroundColor: 'rgba(13, 148, 136, 0.6)',
                    borderColor: 'rgba(13, 148, 136, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Story Points'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Sprint'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    },

    addSprint() {
        const newVelocity = Utils.getRandomVelocity();
        const newSprintNumber = this.velocityData.length + 1;

        this.velocityData.push(newVelocity);
        this.sprintLabels.push(`Sprint ${newSprintNumber}`);

        this.chart.data.labels = this.sprintLabels;
        this.chart.data.datasets[0].data = this.velocityData;
        this.chart.update();

        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Sprint ${newSprintNumber} added with ${newVelocity} story points`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
};

// Planning Poker Module
const PlanningPoker = {
    currentStoryIndex: 0,

    init() {
        DOM.pokerCards.forEach(card => {
            card.addEventListener('click', () => this.selectCard(card));

            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectCard(card);
                }
            });
        });
    },

    selectCard(card) {
        const value = card.dataset.value;
        const randomTeamEstimate = CONFIG.POKER.FIBONACCI[
            Math.floor(Math.random() * CONFIG.POKER.FIBONACCI.length)
        ];

        // Clear previous result and create new elements
        DOM.pokerResult.innerHTML = '';

        const yourEstimate = Utils.createElementWithText('p', `Your estimate: ${value} points`);
        yourEstimate.innerHTML = `Your estimate: <strong>${value} points</strong>`;

        const teamAverage = Utils.createElementWithText('p', `Team average: ${randomTeamEstimate} points`);
        teamAverage.innerHTML = `Team average: <strong>${randomTeamEstimate} points</strong>`;

        const consensus = Utils.createElementWithText('p',
            value == randomTeamEstimate ? '✅ Consensus reached!' : '💬 Discussion needed to align estimates',
            'text-sm mt-2'
        );

        DOM.pokerResult.appendChild(yourEstimate);
        DOM.pokerResult.appendChild(teamAverage);
        DOM.pokerResult.appendChild(consensus);

        // Highlight selected card
        DOM.pokerCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Change to new story after delay
        setTimeout(() => {
            this.loadNewStory();
            DOM.pokerResult.innerHTML = '';
            DOM.pokerCards.forEach(c => c.classList.remove('selected'));
        }, CONFIG.POKER.STORY_CHANGE_DELAY);
    },

    loadNewStory() {
        this.currentStoryIndex = (this.currentStoryIndex + 1) % CONFIG.POKER.USER_STORIES.length;
        DOM.pokerStory.textContent = `"${CONFIG.POKER.USER_STORIES[this.currentStoryIndex]}"`;
    }
};

// User Story Generator Module
const StoryGenerator = {
    init() {
        DOM.generateStoriesBtn.addEventListener('click', () => this.generate());
    },

    generate() {
        const vision = DOM.visionInput.value.trim();

        if (!vision) {
            Utils.showError(DOM.generatedOutput.parentElement, 'Please enter a product vision first.');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call
        setTimeout(() => {
            try {
                const mockStories = this.generateMockStories(vision);
                this.displayStories(mockStories);
            } catch (error) {
                Utils.showError(DOM.generatedOutput.parentElement, 'Failed to generate stories. Please try again.');
            } finally {
                this.setLoadingState(false);
            }
        }, CONFIG.ANIMATION.LOADING_DELAY);
    },

    generateMockStories(vision) {
        // Enhanced mock data generation based on vision keywords
        return [
            { story: "As a student, I want to create an account so that I can access the marketplace.", points: 3 },
            { story: "As a seller, I want to post items with photos and descriptions so that buyers can see what I'm selling.", points: 5 },
            { story: "As a buyer, I want to search for items by category so that I can find what I need quickly.", points: 8 },
            { story: "As a user, I want to message other users so that I can negotiate prices and arrange meetups.", points: 5 },
            { story: "As a seller, I want to mark items as sold so that buyers know they're no longer available.", points: 2 }
        ];
    },

    displayStories(stories) {
        // Clear previous content
        DOM.generatedOutput.innerHTML = '';

        // Create title
        const title = Utils.createElementWithText('h4', 'Generated User Stories:', 'font-semibold text-slate-800 mb-3');
        DOM.generatedOutput.appendChild(title);

        // Create story items
        stories.forEach(item => {
            const storyDiv = document.createElement('div');
            storyDiv.className = 'border-l-4 border-teal-500 pl-4 py-2';

            const storyText = Utils.createElementWithText('p', item.story, 'text-slate-700');
            const pointsText = Utils.createElementWithText('p', `Estimated: ${item.points} story points`, 'text-sm text-teal-600 font-medium');

            storyDiv.appendChild(storyText);
            storyDiv.appendChild(pointsText);
            DOM.generatedOutput.appendChild(storyDiv);
        });

        // Create summary
        const totalPoints = stories.reduce((sum, item) => sum + item.points, 0);
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'mt-4 p-3 bg-teal-50 rounded';

        const totalText = document.createElement('p');
        totalText.className = 'text-sm text-teal-700';
        totalText.innerHTML = `<strong>Total Estimated Effort:</strong> ${totalPoints} story points`;

        const timeText = Utils.createElementWithText('p',
            `Estimated Development Time: 2-3 sprints (assuming 10-15 points per sprint)`,
            'text-sm text-teal-600 mt-1'
        );

        summaryDiv.appendChild(totalText);
        summaryDiv.appendChild(timeText);
        DOM.generatedOutput.appendChild(summaryDiv);
    },

    setLoadingState(isLoading) {
        DOM.generateStoriesBtn.disabled = isLoading;
        DOM.generateText.textContent = isLoading ? 'Generating...' : 'Generate User Stories ✨';
        DOM.generateSpinner.classList.toggle('hidden', !isLoading);
    }
};

// Release Plan Generator Module
const ReleasePlanGenerator = {
    init() {
        DOM.generateReleaseBtn.addEventListener('click', () => this.generate());
    },

    generate() {
        const goal = DOM.releaseGoalInput.value.trim();

        if (!goal) {
            Utils.showError(DOM.generatedReleaseOutput.parentElement, 'Please enter a release goal first.');
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call
        setTimeout(() => {
            try {
                this.displayReleasePlan(goal);
            } catch (error) {
                Utils.showError(DOM.generatedReleaseOutput.parentElement, 'Failed to generate release plan. Please try again.');
            } finally {
                this.setLoadingState(false);
            }
        }, CONFIG.ANIMATION.LOADING_DELAY);
    },

    displayReleasePlan(goal) {
        // Clear previous content
        DOM.generatedReleaseOutput.innerHTML = '';

        // Create title
        const title = Utils.createElementWithText('h4', 'Release Plan Outline:', 'font-semibold text-slate-800 mb-3');
        DOM.generatedReleaseOutput.appendChild(title);

        const container = document.createElement('div');
        container.className = 'space-y-4';

        // Release Goal Section
        const goalSection = this.createSection('🎯 Release Goal', goal);
        container.appendChild(goalSection);

        // Key Features Section
        const featuresSection = this.createListSection('📦 Key Features', [
            'User authentication and profile management',
            'Core photo upload and sharing functionality',
            'Basic social interactions (likes, comments)',
            'Mobile-responsive design'
        ]);
        container.appendChild(featuresSection);

        // Timeline Section
        const timelineSection = this.createSection('🗓️ Timeline', '6-8 weeks (3-4 sprints)');
        container.appendChild(timelineSection);

        // Key Risks Section
        const risksSection = this.createListSection('⚠️ Key Risks', [
            'Third-party API integration delays',
            'Mobile performance optimization challenges',
            'User acceptance testing feedback'
        ]);
        container.appendChild(risksSection);

        // Success Metrics Section
        const metricsSection = this.createListSection('📊 Success Metrics', [
            '100+ active users in first month',
            'Average session duration > 5 minutes',
            'Photo upload success rate > 95%'
        ]);
        container.appendChild(metricsSection);

        DOM.generatedReleaseOutput.appendChild(container);
    },

    createSection(title, content) {
        const section = document.createElement('div');
        const titleEl = Utils.createElementWithText('h5', title, 'font-medium text-slate-700');
        const contentEl = Utils.createElementWithText('p', content, 'text-sm text-slate-600');
        section.appendChild(titleEl);
        section.appendChild(contentEl);
        return section;
    },

    createListSection(title, items) {
        const section = document.createElement('div');
        const titleEl = Utils.createElementWithText('h5', title, 'font-medium text-slate-700');
        section.appendChild(titleEl);

        const ul = document.createElement('ul');
        ul.className = 'text-sm text-slate-600 list-disc list-inside';
        items.forEach(item => {
            const li = Utils.createElementWithText('li', item);
            ul.appendChild(li);
        });
        section.appendChild(ul);
        return section;
    },

    setLoadingState(isLoading) {
        DOM.generateReleaseBtn.disabled = isLoading;
        DOM.generateReleaseText.textContent = isLoading ? 'Generating...' : 'Generate Release Plan ✨';
        DOM.generateReleaseSpinner.classList.toggle('hidden', !isLoading);
    }
};

// PMBOK Module
const PMBOK = {
    init() {
        DOM.explainRelationshipBtn.addEventListener('click', () => this.toggleExplanation());
    },

    toggleExplanation() {
        if (DOM.relationshipExplanation.classList.contains('hidden')) {
            this.showExplanation();
        } else {
            DOM.relationshipExplanation.classList.add('hidden');
        }
    },

    showExplanation() {
        DOM.relationshipContent.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h5 class="font-semibold text-slate-800">Integration Strategies</h5>
                    <p>Modern software development often benefits from combining PMBOK's structured approach with Agile's flexibility. Here's how they can work together:</p>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded border">
                        <h6 class="font-medium text-blue-700">Project Initiation (PMBOK)</h6>
                        <ul class="text-sm text-slate-600 mt-2 space-y-1">
                            <li>• Stakeholder analysis</li>
                            <li>• Charter development</li>
                            <li>• Risk assessment</li>
                            <li>• Resource planning</li>
                        </ul>
                    </div>
                    <div class="bg-white p-4 rounded border">
                        <h6 class="font-medium text-green-700">Execution (Agile)</h6>
                        <ul class="text-sm text-slate-600 mt-2 space-y-1">
                            <li>• Sprint planning</li>
                            <li>• Daily standups</li>
                            <li>• Retrospectives</li>
                            <li>• Continuous delivery</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h5 class="font-semibold text-slate-800">When to Use Each Approach</h5>
                    <div class="grid md:grid-cols-3 gap-4 mt-2">
                        <div class="bg-blue-50 p-3 rounded">
                            <h6 class="font-medium text-blue-800">PMBOK Focus</h6>
                            <p class="text-sm text-blue-700 mt-1">Large, complex projects with fixed requirements and regulatory constraints</p>
                        </div>
                        <div class="bg-green-50 p-3 rounded">
                            <h6 class="font-medium text-green-800">Agile Focus</h6>
                            <p class="text-sm text-green-700 mt-1">Innovative products with evolving requirements and need for rapid feedback</p>
                        </div>
                        <div class="bg-purple-50 p-3 rounded">
                            <h6 class="font-medium text-purple-800">Hybrid Approach</h6>
                            <p class="text-sm text-purple-700 mt-1">Enterprise software with both stability and innovation requirements</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h5 class="font-semibold text-slate-800">Practical Implementation</h5>
                    <p>In your CS/SE career, you'll likely encounter both approaches. Understanding when and how to apply each methodology will make you a more effective software engineer and project contributor.</p>
                </div>
            </div>
        `;
        DOM.relationshipExplanation.classList.remove('hidden');
    }
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize DOM cache
        DOM.init();

        // Initialize all modules
        Navigation.init();
        RoadmapDiagram.init();
        VelocityChart.init();
        PlanningPoker.init();
        StoryGenerator.init();
        ReleasePlanGenerator.init();
        PMBOK.init();

        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        alert('An error occurred while loading the page. Please refresh and try again.');
    }
});
