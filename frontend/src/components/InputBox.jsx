import { useForm } from 'react-hook-form';
import Button from './Button';
import './InputBox.css';

function InputBox({fields, buttonText, buttonTopText, onSubmit}) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    // Connect to backend later...
    // const onSubmit = (data) => {
    //     console.log(data);

    //     // Note from Will here - I havent worked with RHF in a while but I
    //     // believe the forum just wont submit with RHF errors so you dont have
    //     // to do with here. However, thats not to say you should immediatley
    //     // navigate them to main because you still need to check stuff like
    //     // the password which can only be verified with an api request
    //     if (fields.reduce((result, field) => result && !errors[field]?.message)) {
    //         navigate('/main');
    //     }
    // }

    // Retrieve the first error message from all the provided fields
    let firstError = fields.reduce((result, field) => result || errors[field.value]?.message, null);

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Generate input fields from provided fields array*/}
            {fields.map(field => (
                <input {...register(field.value, {required: `Please provide ${field.name.toLowerCase()}!`})} placeholder={field.name} key={fields.indexOf(field)}/>
            ))}

            {/*Replace all spaces with empty string*/}
            <Button
                className={buttonText.replace(/\s+/g, '').toLowerCase() + '-button'}
                topText={firstError || buttonTopText}
                innerText={buttonText}
            />
        </form>
        </>
    )
}

export default InputBox;