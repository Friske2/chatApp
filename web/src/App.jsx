import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Chat from './pages/ChatRoom'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header fade-in border-b border-base-300 pb-4">
          <div className="navbar bg-base-100 rounded-box shadow-sm">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl text-primary">ChatApp</a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
          </div>
        </header>
        <main className="app-content fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
