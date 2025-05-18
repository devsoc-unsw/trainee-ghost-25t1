import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SignUp, Login, Main } from './pages'
import AuthProvider from './context/authProvider';


function App() {

  return (
    <>
      <main>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element = {<SignUp />}/>
              <Route path="/login" element = {<Login />}/>
              <Route path="/" element = {<Main />}/> {/* Add conditions later on */}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </main>
    </>
  )
}

export default App
