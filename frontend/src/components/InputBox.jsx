import { useForm } from 'react-hook-form';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import './InputBox.css';

function InputBox({fields, buttonText}) {
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
        if (fields.reduce((result, field) => result && !errors[field]?.message)) {
            navigate('/main');
        }

        // try {
        //     // Make login request to backend
        //     const response = await fetch('http://localhost:5000/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: data.email,
        //             password: data.password
        //         })
        //     });

        //     console.log(response)

        //     // Route to main on success and store token
        //     if (response.success) {
        //         navigate('/main');
        //         user = response.user;
        //         token = response.token;
        //         console.log(user, token);
        //     } else {
        //         console.log(`Login error: ${response.error}`);
        //     }
        // } catch (error) {
        //     console.error(`Login error: ${error}`);
        // }
    }

    // Retrieve the first error message from all the provided fields
    let firstError = fields.reduce((result, field) => result || errors[field]?.message, null);

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Generate input fields from provided fields array*/}
            {fields.map(field => (
                <input {...register(field, {required: `Please provide ${field}!`})} placeholder={field} key={fields.indexOf(field)}/>
            ))}

            {/*Replace all spaces with empty string*/}
            <Button
                className={buttonText.replace(/\s+/g, '').toLowerCase() + '-button'}
                topText={firstError}
                innerText={buttonText}
            />
        </form>
        </>
    )
}

export default InputBox;