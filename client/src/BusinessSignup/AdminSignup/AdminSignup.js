import React from 'react';
import SignupForm from '../SignupForm/SignupForm';

const AdminSignup = (props) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');    

    return (
        <SignupForm
         First_Name={firstName}
         Last_Name={lastName}
         Email={email} 
         Password={password} 
         Confirm_Password={confirmPassword} 
         ></SignupForm>
    )
}
export default AdminSignup;