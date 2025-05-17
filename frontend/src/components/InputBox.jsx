import { useForm } from 'react-hook-form';
import Button from './Button';
import './InputBox.css';

// Component containing a form with a dynamic number of input fields and a submit button
function InputBox({fields, buttonText, buttonTopText, onSubmit}) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    // Retrieve the first error message from all the provided fields
    let firstError = fields.reduce((result, field) => result || errors[field.value]?.message, null);

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/*Generate input fields from provided fields array*/}
            {fields.map(field => (
                <input {...register(field.value, {required: `Please provide ${field.name.toLowerCase()}!`})}
                    type={(field.value === 'password' || field.value === 'confirmPassword') ? 'password' : 'text'}
                    placeholder={field.name}
                    key={fields.indexOf(field)}
                />
            ))}

            {/*Replace all spaces with empty string to generate classname of button*/}
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