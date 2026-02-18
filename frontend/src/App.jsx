import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Safety from './pages/Safety'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="safety" element={<Safety />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
