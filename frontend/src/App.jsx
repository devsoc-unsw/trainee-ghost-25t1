import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SignUp, Login, Main, Home } from './pages'

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element = {<SignUp />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/main" element = {<Main />}/> {/* Add conditions later on */}
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
