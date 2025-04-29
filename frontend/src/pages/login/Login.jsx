import { useNavigate } from 'react-router-dom';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import '../../components/InputBox.css';

function Login() {
  const navigate = useNavigate();

  return (
    <>
        <div className='auth-box'>
            Login
            <InputBox fields={["email", "password"]} buttonText="Sign In"/>
            <Button
              className="register-button"
              topText="don't have an account?"
              innerText='Register'
              onClick={() => navigate('/signup')}
            />
        </div>
    </>
  )
}

export default Login
