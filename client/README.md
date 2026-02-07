# IVC Frontend (Client)

The frontend for the **Innovators & Visionaries Club (IVC)** is a high-performance, visually stunning web application designed with a premium "Glassmorphism" aesthetic.

---

## Design Vision

This application follows a **Premium Dark Aesthetic** inspired by modern glass design:
- **Liquid Glass**: High-transparency panels with multi-layer blurs and glossy reflections.
- **3D Interactive Hero**: A 3D parallax hero card that reacts to mouse movement and tilt.
- **Micro-interactions**: Shimmering typography, haptic tap feedback, and ambient pulsing glows.
- **Smart Navigation**: A header that automatically hides on scroll to maximize content visibility and pops back in on scroll up.

---

## Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## Key Components

### 1. `Navbar`
- **Smart Scroll**: Automatically hides when scrolling down and appears when scrolling up.
- **Mobile Menu**: A crystal-clear glass drawer with a sliding "active section" pill and haptic buttons.

### 2. `Home`
- **3D Tilt**: Uses GPU-accelerated transforms to tilt the interactive glass card based on mouse position.
- **Shimmer Typography**: Custom "scanning light" animation on the main tagline.
- **Logo Aura**: A breathing ambient glow that draws focus to the brand logo.

### 3. `LiquidButton`
- A reusable high-gloss button component with liquid-glare hover effects and physical spring feedback.

---

## Local Development

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.
