import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data before submitting API call

    const formSubmitData = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
    };

    try {
      setIsLoading(true);
      await axios.post(
        'http://localhost:8000/api/auth/register',
        formSubmitData
      );
      navigate('/login');
    } catch (error) {
      console.log('Something went wrongs', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='min-h-screen flex  flex-col items-center justify-center bg-gray-50'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2>Create new account</h2>
        <p>
          Or <Link>sign in to your account</Link>
        </p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              name='username'
              className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder:text-gray-400 hover:ring-indigo-500 focus:border-indigo-500'
              value={formData.username}
              onChange={handleChange}
              id='username'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='text'
              name='email'
              className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder:text-gray-400 hover:ring-indigo-500 focus:border-indigo-500'
              value={formData.email}
              onChange={handleChange}
              id='email'
            />
          </div>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder:text-gray-400 hover:ring-indigo-500 focus:border-indigo-500'
              value={formData.password}
              onChange={handleChange}
              id='password'
            />
          </div>
          <button
            type='submit'
            className='rounded-md bg-indigo-300 py-3 text-white w-full'>
            {isLoading ? 'Submitting' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
