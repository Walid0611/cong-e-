import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); 
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = (e) => {
        e.preventDefault();
        console.log('UserName', username);
        console.log('Email', email);
        console.log('Password', password);

        const userData = {
            username: username,
            email: email,
            password: password,
        };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('User created successfully:', data);
                router.push('/login');
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center text-dark mt-5">Login Form</h2>
                        <div className="text-center mb-5 text-dark">Made by WALID</div>
                        <div className="card my-5">
                            <form className="card-body cardbody-color p-lg-5" onSubmit={createUser}>
                                <div className="text-center">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                        className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        width="200px"
                                        alt="profile"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create User
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
