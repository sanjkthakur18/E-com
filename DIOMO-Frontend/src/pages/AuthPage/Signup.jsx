import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectUserStatus } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import './AuthPage.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserStatus);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.firstname || !formData.lastname || !formData.mobile || !formData.password) {
      setError('Please enter the fields.');
      return;
    }

    try {
      console.log(formData);
      dispatch(registerUser(formData));
      navigate('/signin');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
      } else {
        throw error;
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {
        userStatus === STATUS.LOADING
          ? <Loader /> :
          <div className="signin-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="auth-card">
                    <h3 className='text-center mb-3'>Sign Up</h3>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-15'>
                      <div>
                        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder='First Name' className="form-control" />
                        {error && <div className="error-message">{error}</div>}
                      </div>
                      <div>
                        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder='Last Name' className="form-control" />
                        {error && <div className="error-message">{error}</div>}
                      </div>
                      <div>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className="form-control" />
                        {error && <div className="error-message">{error}</div>}
                      </div>
                      <div>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder='Mobile Number' className="form-control" />
                        {error && <div className="error-message">{error}</div>}
                      </div>
                      <div>
                        <input type={showPassword ? 'text' : 'password'} name='password' value={formData.password} onChange={handleChange} placeholder='Password' className="form-control" />
                        {error && <div className="error-message">{error}</div>}
                      </div>
                      <div>
                        <input type="checkbox" checked={showPassword} name='showPassword' onChange={handleShowPassword} className="px-2 mx-2" />
                        : Show Password
                      </div>
                      <div>
                        <div className="button-signup">
                          <button className='button signup border-0'>Signup</button>
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

export default Signup;