import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SignUp, Login, Main } from './pages'
import AuthProvider from './context/authProvider';


function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element = {<SignUp />}/>
              <Route path="/login" element = {<Login />}/>
              <Route path="/" element = {<Main />}/> {/* Add conditions later on */}
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
