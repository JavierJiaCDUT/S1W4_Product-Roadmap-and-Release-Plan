# Week 4: Agile Project Roadmap and Release Planning

An interactive learning module for understanding Agile project planning, product roadmaps, release planning, and estimation techniques.

## 📚 Overview

This project provides an interactive educational tool for students learning about:
- Product Roadmap creation and management
- Release Planning strategies
- Agile estimation techniques (Story Points & Planning Poker)
- Team Velocity tracking
- Integration of Agile with PMBOK frameworks

## 🚀 Features

### Interactive Components

1. **Agile vs. Traditional Planning Comparison**
   - Side-by-side comparison of planning methodologies
   - Clear visualization of key differences

2. **Product Roadmap Explorer**
   - Hierarchical visualization (Vision → Roadmap → Release Plan)
   - Interactive diagram with keyboard navigation
   - Detailed explanations for each level

3. **Release Planning Assistant**
   - Mock AI-powered release plan generator
   - Structured output including goals, features, timeline, and metrics

4. **Agile Estimation Tools**
   - **Velocity Chart**: Interactive bar chart tracking team performance
   - **Planning Poker**: Simulation of team estimation sessions
   - **Story Generator**: Convert product vision into user stories with estimates

5. **PMBOK Integration**
   - Explanation of how Agile and traditional PM can work together
   - Practical implementation strategies

## 🏗️ Project Structure

```
S1W4_Product-Roadmap-and-Release-Plan/
├── index.html           # Main HTML file (optimized and accessible)
├── css/
│   └── styles.css      # Custom styles (extracted from inline)
├── js/
│   └── app.js          # Application logic (modular and secure)
├── Lecture Plan.md     # Detailed teaching plan (bilingual CN/EN)
├── README.md           # Project documentation
└── LICENSE             # MIT License
```

## ✨ Recent Optimizations (High Priority)

### 1. Security Enhancements
- ✅ Added SRI (Subresource Integrity) checks for CDN resources
- ✅ Fixed XSS vulnerabilities by replacing `innerHTML` with `textContent`
- ✅ Safe DOM manipulation using `createElement` and `createElementWithText`

### 2. Accessibility Improvements
- ✅ Added ARIA labels and roles throughout the interface
- ✅ Keyboard navigation support for all interactive elements
- ✅ Screen reader announcements for dynamic content
- ✅ "Skip to main content" link
- ✅ Proper tab order and focus management

### 3. SEO Optimization
- ✅ Comprehensive meta descriptions
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Semantic HTML structure

### 4. Code Organization
- ✅ Extracted CSS to separate `styles.css` file
- ✅ Extracted JavaScript to modular `app.js` file
- ✅ Configuration constants for easy maintenance
- ✅ Utility functions for common operations
- ✅ Module pattern for organized code

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CSS
- **JavaScript (ES6+)** - Modern, modular code
- **Chart.js** - Velocity tracking visualization
- **Tailwind CSS** - Utility-first CSS framework
- **Noto Sans SC** - Chinese/English font support

## 🔧 Configuration

Key configuration constants in `js/app.js`:

```javascript
const CONFIG = {
    VELOCITY: {
        MIN: 20,
        MAX: 35,
        INITIAL_DATA: [23, 27, 31, 25, 29, 33]
    },
    POKER: {
        STORY_CHANGE_DELAY: 5000, // 5 seconds
        FIBONACCI: [1, 2, 3, 5, 8, 13, 21]
    },
    ANIMATION: {
        LOADING_DELAY: 2000
    }
};
```

## 📖 Usage

### For Instructors

1. Open `index.html` in a web browser
2. Use the navigation tabs to present different topics
3. Interact with demos to show practical applications
4. Refer to `Lecture Plan.md` for detailed teaching notes

### For Students

1. Navigate through the 5 main sections:
   - Core Concepts
   - Product Roadmap
   - Release Plan
   - Agile Estimation
   - PMBOK Integration
2. Click on interactive elements to explore
3. Try the Planning Poker simulation
4. Generate sample user stories and release plans

## 🎯 Learning Objectives

### Knowledge Level
- Understand Product Roadmap and Release Plan concepts
- Learn about Story Points and relative estimation
- Recognize differences between Agile and traditional planning

### Skills Level
- Create basic product roadmaps
- Plan releases with goals and dependencies
- Use Planning Poker for estimation

### Application Level
- Transform product vision into executable roadmaps
- Apply Velocity for capacity planning
- Map Agile practices to PMBOK knowledge areas

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: ARIA labels and live regions
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic HTML**: Proper heading hierarchy and landmark regions

## 🔒 Security Features

- Subresource Integrity (SRI) for external resources
- XSS prevention through safe DOM manipulation
- Input validation and sanitization
- HTTPS-only external resources

## 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers (1920px+)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

## 🐛 Known Limitations

- AI generators use mock data (not connected to real AI APIs)
- Velocity data is randomly generated for demonstration
- Planning Poker simulates team responses

## 🔮 Future Enhancements

### Suggested Improvements
- [ ] Connect to real AI API (e.g., OpenAI, Gemini)
- [ ] Add data persistence with localStorage
- [ ] Export functionality (PDF, JSON)
- [ ] Multi-language support (language switcher)
- [ ] Dark mode theme
- [ ] More estimation techniques (T-shirt sizing, Dot voting)
- [ ] Real-time collaboration features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

This is an educational project. Suggestions and improvements are welcome!

## 📞 Support

For questions about using this tool in your classroom or suggestions for improvement, please open an issue in the repository.

---

**Built with ❤️ for CS/SE Agile Education**

*Last Updated: October 2024*
