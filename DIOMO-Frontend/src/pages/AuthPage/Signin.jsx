import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { loginUser, selectUserStatus } from '../../store/authSlice';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import './AuthPage.scss';

const Signin = () => {
    const dispatch = useDispatch();
    const userStatus = useSelector(selectUserStatus);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [cookie, setCookie] = useCookies(['refreshToken']);
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Please enter the fields.');
            dispatch({ type: 'auth/setError' });
            return;
        }
        
        dispatch(loginUser(formData)).then(() => {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                console.log('Setting refreshToken cookie:', refreshToken);
                setCookie('refreshToken', refreshToken, {
                    path: '/',
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    secure: true,
                    sameSite: 'strict',
                });
                const cookies = document.cookie;
                console.log(cookies);
            }
            navigate('/');
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {
                userStatus === STATUS.LOADING ?
                    <Loader />
                    : <div className="signin-wrapper home-wrapper-2 py-5">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <div className="auth-card">
                                        <h3 className='text-center mb-3'>Signin</h3>
                                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-15'>
                                            <div>
                                                <input type="email" name="email" onChange={handleChange} placeholder='Email' className="w-100 px-2 form-control" />
                                                {error && <div className="error-message">{error}</div>}
                                            </div>
                                            <div>
                                                <input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} placeholder='Password' className="w-100 px-2 form-control" />
                                                {error && <div className="error-message">{error}</div>}
                                            </div>
                                            <div>
                                                <input type="checkbox" checked={showPassword} name='showPassword' onChange={handleShowPassword} className="px-2 mx-2" />
                                                : Show Password
                                            </div>
                                            <div className="forgto-password d-flex align-items-center justify-content-center gap-10">
                                                <Link to='/forgot-password'>Forgot Password?</Link>
                                            </div>
                                            <div className='auth-buttons'>
                                                <div>
                                                    <button className="button border-0" type='submit'>Signin</button>
                                                    <Link className='button signup' to='/signup'>Signup</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};

export default Signin;