import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignUp, Login, Main } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element = {<SignUp />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/main" element = {<Main />}/> {/* Add conditions later on */}
          </Routes>
        </BrowserRouter>

        <div>
          <p1>Anything written below the browser router will appear below the pages we import! wink wink we can make a footer</p1>
        </div>
      </main>
    </>
  )
}

export default App
