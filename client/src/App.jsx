import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Domains from './pages/Domains';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import Join from './pages/Join';
import Achievements from './pages/Achievements';

import InteractiveBackground from './components/InteractiveBackground';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ivc-bg text-ivc-text font-sans selection:bg-ivc-primary selection:text-white flex flex-col relative">
        <InteractiveBackground />
        <Navbar />
        <main className="flex-grow relative z-10">
          <section id="home"><Home /></section>
          <section id="about"><About /></section>
          <section id="domains"><Domains /></section>
          <section id="projects"><Projects /></section>
          <section id="events"><Events /></section>
          <section id="achievements"><Achievements /></section>
          <section id="team"><Team /></section>
          <section id="join"><Join /></section>
        </main>

        <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-gray-50 backdrop-blur-sm">
          &copy; {new Date().getFullYear()} IVC - Innovation & Value Creation Club. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
