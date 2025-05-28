import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmitData = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(formSubmitData));
  };

  return (
    <div className='min-h-screen flex items-center justify-center mx-auto bg-gray-50'>
      <div className='max-w-[600px] bg-white rounded-md p-6'>
        <h2 className='text-center mb-4'>Login page</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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

export default LoginPage;
