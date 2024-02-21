import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../Store/Slices/UserSlice';
import { userSignUp } from '../../Api/userApi'
const Signup = () => {
    const [err, setErr] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        password: '',
        isAdmin: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.name.length < 3) {
                return setErr("Name must contain 3 letters")
            } else if (!emailPattern.test(formData.email)) {
                return setErr("Invalid email format")
            } else if (!passwordRegex.test(formData.password)) {
                return setErr("Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.")
            }
            // const response = await axios.post('http://localhost:8080/signup', formData);
            // console.log('User signed up successfully:', response.data);
            const signUpResposnse = await userSignUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            });

            if (signUpResposnse.status) {
                localStorage.setItem('token', signUpResposnse.token);
                dispatch(setUserDetails({
                    id: signUpResposnse.userData._id,
                    name: signUpResposnse.userData.name,
                    email: signUpResposnse.userData.email,
                    is_Admin: signUpResposnse.userData.is_Admin,
                    phone: signUpResposnse.userData.phone,
                    image: ""
                }));
                navigate('/login');
            }else{
                setErr(signUpResposnse.error)
            }
        } catch (error) {
            setErr('Error signing up:', error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2"
                />
                
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Sign Up
                </button>
                {err && <span style={{ color: "red" }}>{err}</span>}
            </form>
        </div>
    );
};

export default Signup

