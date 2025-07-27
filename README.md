# Bench Press Strength Calculator

A professional web application that calculates your bench press strength level and percentile ranking based on real-world data from Strength Level.

## 🏋️‍♂️ Features

- **Comprehensive Strength Assessment**: Calculate your percentile ranking and strength level
- **Real Data**: Based on 45+ million lifts from Strength Level
- **Multiple Comparisons**: Compare by age or body weight
- **Professional Design**: Modern, responsive UI with gym-themed styling
- **Input Validation**: Realistic ranges prevent errors
- **Clear Results**: Shows both percentile and "Top %" for easy understanding

## 🎯 How It Works

1. **Enter your details**: Gender, age, weight, and bench press max
2. **Choose comparison method**: By age or by body weight
3. **Get your results**: Percentile ranking, strength level, and top percentage

## 📊 Strength Levels

- **World Class**: 95th+ percentile (top 5%)
- **Elite**: 80th+ percentile (top 20%)
- **Advanced**: 50th+ percentile (top 50%)
- **Intermediate**: 20th+ percentile (top 80%)
- **Novice**: 5th+ percentile (top 95%)
- **Beginner**: Below 5th percentile

## 🚀 Getting Started

### Option 1: Use the Live Version
Visit the deployed version (if available)

### Option 2: Run Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bench-press-calculator.git
   cd bench-press-calculator
   ```

2. **Start a local server**:
   ```bash
   python -m http.server 8000
   ```

3. **Open your browser** and go to `http://localhost:8000`

## 📁 Project Structure

```
bench-press-calculator/
├── index.html          # Main application
├── styles.css          # Styling and responsive design
├── data/
│   └── percentiles.json # Strength data from Strength Level
├── simple.html         # Simplified test version
├── debug.html          # Debug/testing page
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and form structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Client-side calculations and data processing
- **Font Awesome**: Gym-themed icons
- **Google Fonts**: Inter font family

## 📊 Data Source

All strength standards are sourced from [Strength Level](https://strengthlevel.com/strength-standards/bench-press), which analyzes over 45 million lifts from real lifters worldwide.

## 🎨 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Input Validation**: Prevents unrealistic values
- **Smooth Animations**: Professional user experience
- **Color-coded Results**: Visual strength level indicators
- **Accessibility**: Proper form labels and semantic HTML

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Data provided by [Strength Level](https://strengthlevel.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/) 