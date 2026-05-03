import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Compare from './pages/Compare';
import Analyzer from './pages/Analyzer';
import FloatingAIButton from './components/FloatingAIButton';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/analyzer" element={<Analyzer />} />
            </Routes>
          </main>
          <FloatingAIButton />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
