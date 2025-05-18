import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SignUp, Login, TeamSelection, Home } from './pages'

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element = {<SignUp />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/team-selection" element = {<TeamSelection />}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
