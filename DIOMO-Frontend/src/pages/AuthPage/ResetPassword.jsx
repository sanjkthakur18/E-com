import React from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.scss';

const ResetPassword = () => {
    return (
        <>
            <div className="signin-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className='text-center mb-3'>Reset Password</h3>
                                <form action="" className='d-flex flex-column gap-15'>
                                    <div className='mt-1'>
                                        <input type="password" required name='password' placeholder='Password' className="form-control" />
                                    </div>
                                    <div className='mt-1'>
                                        <input type="password" required name='confpassword' placeholder='Confirm-Password' className="form-control" />
                                    </div>
                                    <div>
                                        <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                            <Link className='button signup border-0'>Ok</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ResetPassword;