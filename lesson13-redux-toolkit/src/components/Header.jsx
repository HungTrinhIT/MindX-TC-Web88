import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <header className='bg-white shadow-lg flex items-center justify-between py-3 px-10'>
      <Link to={'/'}>
        <h1>ReduxToolkit</h1>
      </Link>
      <nav className=''>
        <ul className='flex items-center gap-x-4'>
          <li>
            <Link to='/'>Homepage</Link>
          </li>
          {isAuthenticated ? (
            <p>Hello {user?.username}</p>
          ) : (
            <>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
