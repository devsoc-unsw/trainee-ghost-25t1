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