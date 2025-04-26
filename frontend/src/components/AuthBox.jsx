import { useNavigate } from 'react-router-dom';
import InputBox from './InputBox'
import Button from './Button'
import '../pages/login/Login.css'

function AuthBox({title}) {
  const navigate = useNavigate();

  return (
    <>
        <div className='auth-box'>
            {title}
            <InputBox title='Login' />
            <Button
              topText="don't have an account?"
              innerText='Register'
              onClick={() => navigate('/signup')}
            />
        </div>
    </>
  )
}

export default AuthBox