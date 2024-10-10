import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateEmployee() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length !== 10) {
            setError('Phone number must be exactly 10 digits.');  
            return;
        }

        try {
            await axios.post('http://localhost:8800/employee/creates', { id, name, address, phone, email });
            navigate('/employee/display'); 
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
            <div className='w-50 p-4 rounded shadow-lg' style={{ backgroundColor: 'white' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center mb-4' style={{ color: 'orange' }}>Add Employee</h2>
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>ID</label>
                        <input 
                            type='number' 
                            placeholder='Enter ID' 
                            className='form-control' 
                            onChange={e => setId(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control' 
                            onChange={e => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Address</label>
                        <input 
                            type='text' 
                            placeholder='Enter Address' 
                            className='form-control' 
                            onChange={e => setAddress(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Phone Number</label>
                        <input 
                            type='text' 
                            placeholder='Enter Phone Number' 
                            className='form-control' 
                            onChange={e => setPhone(e.target.value)} 
                            required 
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Email</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            className='form-control' 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className='btn w-100' style={{ backgroundColor: 'orange', color: 'white' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
