import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UpdateEmployee() {
    const Employee = useSelector((state) => state.Employee.Update_Employee);

    const { id } = useParams(); 
    const [Id, setId] = useState(Employee.id ? Employee.id : ""); 
    const [name, setName] = useState(Employee.name ? Employee.name : "");
    const [address, setAddress] = useState(Employee.address ? Employee.address : "");
    const [phone, setPhone] = useState(Employee.phoneno ? Employee.phoneno : "");
    const [email, setEmail] = useState(Employee.email ? Employee.email : "");
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Update Employee ID:", Employee);
    }, [Employee]);
    
    function handleSubmit(event) {
        event.preventDefault();
        if (phone.length !== 10) {
            setError('Phone number must be exactly 10 digits.');
            return; 
        } else {
            setError(''); 
        }

        axios.put(`http://localhost:8800/employee/update/${id}`, { name, address, phone, email })
            .then(res => {
                console.log(res);
                navigate('/employee/display'); 
            })
            .catch(err => {
                console.error('Error updating employee:', err);
                alert('Failed to update employee. Please try again.'); 
            });
    }

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-50 p-4 rounded shadow-lg' style={{ backgroundColor: 'white' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center mb-4' style={{ color: 'orange' }}>Update Employee</h2>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>ID</label>
                        <input 
                            type='number' 
                            value={Id} 
                            className='form-control' 
                            onChange={e => setId(e.target.value)} 
                            disabled 
                        />
                    </div>
                    
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Name</label>
                        <input 
                            type="text" 
                            placeholder='Enter Name' 
                            className='form-control' 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Address</label>
                        <input 
                            type="text" 
                            placeholder='Enter Address' 
                            className='form-control' 
                            value={address} 
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Phone Number</label>
                        <input 
                            type="text" 
                            placeholder='Enter Phone Number' 
                            className='form-control' 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)} 
                        />
                    </div>
                    
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Email</label>
                        <input 
                            type="email" 
                            placeholder='Enter Email' 
                            className='form-control' 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <button className='btn w-100' style={{ backgroundColor: 'orange', color: 'white' }}>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployee;
