import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function App() {
    const { register, errors, handleSubmit } = useForm();
    const [user, setUser] = useState({})
    
    const onSubmit = data => {
        const user = data;
        axios.post('https://reqres.in/api/users/2', user)
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }

    console.log(user)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input placeholder='First Name' type='text' name='firstName' ref={register({ required: true, maxLength: 20 })} />
			{errors.firstName && 'First name is required'}
			<input
				placeholder='Last Name'
				type='text'
				name='lastName'
				ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
			/>
			{errors.lastName && 'Last Name is Required'}
			<input
				placeholder='Email'
				type='email'
				name='email'
				ref={register({
					required: true,
					pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					maxLength: 60,
				})}
			/>
			{errors.email && 'Email is Required In Regular Format'}
			<input placeholder='age' name='age' type='number' ref={register({ min: 18, max: 179, required: true })} />
			{errors.age && 'Must be at least 18 years old to register'}
			<input type='submit' />
		</form>
	);
}
