# Kfx Player - Minimalist Video Player

A clean, minimalist video player built with React, JavaScript, and Tailwind CSS, featuring a YouTube-style grid and Odysee video integration.

## Features

- **Minimalist Design**: No social distractions, just video and content.
- **Odysee Integration**: Specifically optimized for Odysee iframe embeds.
- **Floating Player**: Videos open in an expandable floating window with background blur.
- **Responsive Grid**: Automatically adjusts from 1 to 4 columns based on screen size.
- **GitHub Pages Ready**: Pre-configured for easy deployment.

## Local Setup

To run this project on your computer, follow these steps:

1. **Prerequisites**:
   - Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

2. **Installation**:
   - Open your terminal/command prompt in the project folder.
   - Run the following command to install dependencies:
     ```bash
     npm install
     ```

3. **Development**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Open your browser and go to `http://localhost:3000` (or the port shown in your terminal).

4. **Build for Production**:
   - To create a production-ready version:
     ```bash
     npm run build
     ```
   - The output will be in the `dist` folder.

5. **Deploy to GitHub Pages**:
   - If you have a GitHub repository connected:
     ```bash
     npm run deploy
     ```

## Project Structure

- `src/components/`: UI components (Navbar, VideoCard, VideoPlayer).
- `src/constants.js`: Mock data and video configurations.
- `src/App.jsx`: Main application logic and layout.
- `vite.config.js`: Vite configuration with Tailwind CSS support.

## Technologies Used

- React 19
- JavaScript
- Tailwind CSS 4
- Lucide React (Icons)
- Motion (Animations)
- React Player (Video handling)
