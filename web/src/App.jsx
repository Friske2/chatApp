import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Chat from './pages/ChatRoom'
import Login from './pages/Login'
import AppLayout from './components/AppLayout'
// import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <main className="app-content fade-in">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  )
}

export default App
