import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import { loginUser } from '../../api/users';
import { setTokenCookie } from '../../utils/cookies';
import '../../components/InputBox.css';

function Login() {
    const [ errorMsg, setErrorMsg ] = useState();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
           const resData = await loginUser(data.email, data.password);

            // Route to main on success and store token in cookies
            if (resData.success) {
                navigate('/main');
                setTokenCookie(resData.token);
            } else {
                console.error(`Login error: ${resData.error}`);
                setErrorMsg(resData.error || 'Something went wrong, please try again');
            }
    }

    return (
        <>
            <div className='auth-box'>
                Login
                <InputBox
                    fields={[
                        {name: "Email Address", value: "email"},
                        {name: "Password", value: "password"}
                    ]}
                    buttonText="Sign In"
                    buttonTopText = {errorMsg}
                    onSubmit={onSubmit}/>
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
