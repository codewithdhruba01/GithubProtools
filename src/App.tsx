import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import FollowerCounter from './pages/FollowerCounter';
import FollowingAnalysis from './pages/FollowingAnalysis';
import ProfileCompare from './pages/ProfileCompare';
import ReadmeDesigner from './pages/ReadmeDesigner';

import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/follower-counter" element={<FollowerCounter />} />
              <Route path="/following-analysis" element={<FollowingAnalysis />} />
              <Route path="/profile-compare" element={<ProfileCompare />} />
              <Route path="/readme-designer" element={<ReadmeDesigner />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
