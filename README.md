# Bench Press Strength Calculator

A web app that calculates your bench press strength level and percentile ranking using real data from Strength Level.

## What it does

- Calculates your percentile ranking and strength level
- Uses data from 45+ million lifts from Strength Level
- Compare yourself to others by age or body weight
- Shows both percentile and "Top %" for clarity

## How to use

1. Enter your gender, age, weight, and bench press max
2. Choose whether to compare by age or body weight
3. Get your results: percentile ranking, strength level, and top percentage

## Strength Levels

- **World Class**: 95th+ percentile (top 5%)
- **Elite**: 80th+ percentile (top 20%)
- **Advanced**: 50th+ percentile (top 50%)
- **Intermediate**: 20th+ percentile (top 80%)
- **Novice**: 5th+ percentile (top 95%)
- **Beginner**: Below 5th percentile

## Run locally

1. Clone the repository
2. Start a local server: `python -m http.server 8000`
3. Open `http://localhost:8000` in your browser

## Files

- `index.html` - Main app
- `styles.css` - Styling
- `data/percentiles.json` - Strength data
- `README.md` - This file

## Data source

All strength standards come from [Strength Level](https://strengthlevel.com/strength-standards/bench-press). 