import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../api/users';
import '../../components/InputBox.css';

function SignUp() {
    const navigate = useNavigate();
    const [ errorMsg, setErrorMsg ] = useState('');

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorMsg(`Passwords don't match!`);
            return;
        }

        const resData = await registerUser(data.username, data.email, data.password);

        // Route to team selection on success
        if (resData.success) {
            navigate('/team-selection');
        } else {
            console.error(`Signup error: ${resData.error}`);
            setErrorMsg(resData.error || 'Something went wrong, please try again');
        }
    }

  return (
    <>
        <div className='input-box'>
            Register
            <InputBox
                fields={[
                    {name: "New Username", value: "username"},
                    {name: "New Email Address", value: "email"},
                    {name: "New Password", value: "password"},
                    {name: "Confirm Password", value: "confirmPassword"}
                ]}
                buttonText="Register"
                buttonTopText={errorMsg}
                onSubmit={onSubmit}
            />
            <Button
                className="signin-button"
                topText="already have an account?"
                innerText='Sign In'
                onClick={() => navigate('/login')}
            />
        </div>
    </>
  )
}

export default SignUp
