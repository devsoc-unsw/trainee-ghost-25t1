import InputBox from '../../components/InputBox';
import '../../components/InputBox.css';

function SignUp() {

  return (
    <>
        <div className='auth-box'>
            Register
            <InputBox fields={["new email", "new password", "confirm password"]} buttonText="Register"/>
        </div>
    </>
  )
}

export default SignUp
