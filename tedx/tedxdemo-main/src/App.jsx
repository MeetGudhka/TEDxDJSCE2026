import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TalkLibrary from './pages/TalkLibrary';
import Events from './pages/Events';
import Membership from './pages/Membership';
import Partners from './pages/Partners';
import SpeakerSubmission from './pages/SpeakerSubmission';
import Contact from './pages/Contact';
import './App.css';
import Footer from './components/Footer';
import About from './pages/About';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HiddenPage from './HiddenPage';
import Speakers from './pages/Speakers';
import Team from './pages/Team';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talk-library" element={<TalkLibrary />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/team" element={<Team />} />

          <Route path="/speaker-submission" element={<SpeakerSubmission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<HiddenPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
