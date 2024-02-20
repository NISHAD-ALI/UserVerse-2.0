import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUserApi } from '../../Api/adminApi'
import './AddUser.css'
const Adduser = () => {
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
    const mobileRegex = /^[0-9]+$/;
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
            }else if (!mobileRegex.test(formData.phone)) {
                return setErr("Mobile Number can only be 10 numbers.")
            }
            // const response = await axios.post('http://localhost:8080/signup', formData);
            // console.log('User signed up successfully:', response.data);
            addUserApi(formData).then((res)=>{
                console.log("success");
                navigate('/admin/dashboard')
            }).catch((err)=>{
                console.log(err.message);
            })
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="max-w-md mx-auto pt-32">
            <h1 className="text-3xl font-bold text-center mb-4">Add User</h1>
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
                    type="tel"
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

export default Adduser

