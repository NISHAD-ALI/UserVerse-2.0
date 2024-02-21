import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { listUsers, deleteUser } from '../../Api/adminApi'
import Swal from 'sweetalert2';

const AdminDashboard = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        listUsers().then((res) => {
            console.log(res.usersData)
            setUsers(res.usersData)
        })
    }, [])
    const logOut = async () => {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
    }



    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };


    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );


    const deleteUsers = (userId) => {
        deleteUser(userId)
            .then((res) => {
                const updatedUsers = users.filter((user) => user._id !== userId);
                setUsers(updatedUsers);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                console.log(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while deleting the user.'
                });
            });
    };

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <div className="flex justify-between items-center mb-4">

                <input
                    type="text"
                    placeholder="Search users"
                    value={search}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border rounded-md w-1/3"
                />


                <Link to={'/admin/AddUser'}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add User</button>
                </Link>

            </div>

            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Serial No.</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone No.</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone || 'Not added '}</td>
                            <td className="border px-4 py-2">


                                <Link to={`/admin/edit/${user._id}`}>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">Edit</button>
                                </Link>

                                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => deleteUsers(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => logOut()}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
