import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loadEditProfle, updateUserData } from '../../Api/adminApi'
const initialState = {
    name: "",
    email: "",
    phone: "",
}
const AdminEditUser = () => {
    const [userData, setUserData] = useState(initialState)
    const [error,setError] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()
    const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    useEffect(()=>{
        const userData = async ()=>{
            loadEditProfle(id).then((res)=>{
                const data = {
                    name:res.userData.name,
                    email:res.userData.email,
                    phone:res.userData.phone
                }
                setUserData(data)
               
            }).catch((err)=>{
                console.log(err.message);
            })
        }
        userData()
    },[])


    const handleSubmit = (e)=>{
        e.preventDefault()
        try {
     
            if(!emailPattern.test(userData.email)){
            return  setError("Invalid email format")
            }else if(userData.name < 4){
            return setError("Name must contain 4 character")
            }else if(userData.phone && userData.phone.length < 10){
                return setError('Phone must contain 10 digits')
            }
            updateUserData(userData,id).then((res)=>{
                navigate('/admin/dashboard')
            }).catch((err)=>{
                console.log(err.message);
            })
           
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update Profile</h3>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" id="name" name="name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" id="email" name="email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                            <input type="text" id="phone" name="phone" onChange={(e) => setUserData({ ...userData, phone: e.target.value })} value={userData.phone} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Update</button>
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminEditUser
