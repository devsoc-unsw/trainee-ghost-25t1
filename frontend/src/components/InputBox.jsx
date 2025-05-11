import { useForm } from 'react-hook-form'
import Button from './Button'
import { useNavigate } from 'react-router-dom';
import '../pages/login/Login.css'

function InputBox() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    // Connect to backend later...
    const onSubmit = (data) => {
        console.log(data);
        // Note from Will here - I havent worked with RHF in a while but I
        // believe the forum just wont submit with RHF errors so you dont have
        // to do with here. However, thats not to say you should immediatley
        // navigate them to main because you still need to check stuff like
        // the password which can only be verified with an api request
        if (!errors.email?.message && !errors.password?.message) {
            navigate('/main')
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {required: 'Please enter an email!'})} placeholder='Email Address' />
            <input {...register("password", {required: 'Please enter a password!'})} placeholder='Password' />

            <Button
                className='signup-button'
                topText={errors.email?.message || errors.password?.message}
                innerText='Sign In'
            />
        </form>
        </>
    )
}

export default InputBox;