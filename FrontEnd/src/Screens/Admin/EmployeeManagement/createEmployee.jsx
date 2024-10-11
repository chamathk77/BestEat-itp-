import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateEmployee() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState({}); // Holds all error messages
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!id || id <= 0) {
            tempErrors.id = 'ID must be a positive number.';
        }
        if (!name) {
            tempErrors.name = 'Name is required.';
        }
        if (!address) {
            tempErrors.address = 'Address is required.';
        }
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            tempErrors.phone = 'Phone number must be exactly 10 digits and only contain numbers.';
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = 'Please enter a valid email address.';
        }

        setError(tempErrors);
        return Object.keys(tempErrors).length === 0; // No errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return; // Exit if validation fails
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

                    {/* ID Field */}
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>ID</label>
                        <input 
                            type='number' 
                            placeholder='Enter ID' 
                            className='form-control' 
                            value={id}
                            onChange={e => setId(e.target.value)} 
                            required 
                        />
                        {error.id && <p style={{ color: 'red' }}>{error.id}</p>}
                    </div>

                    {/* Name Field */}
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            className='form-control' 
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            required 
                        />
                        {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
                    </div>

                    {/* Address Field */}
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Address</label>
                        <input 
                            type='text' 
                            placeholder='Enter Address' 
                            className='form-control' 
                            value={address}
                            onChange={e => setAddress(e.target.value)} 
                            required 
                        />
                        {error.address && <p style={{ color: 'red' }}>{error.address}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Phone Number</label>
                        <input 
                            type='text' 
                            placeholder='Enter Phone Number' 
                            className='form-control' 
                            value={phone}
                            onChange={e => setPhone(e.target.value)} 
                            required 
                        />
                        {error.phone && <p style={{ color: 'red' }}>{error.phone}</p>}
                    </div>

                    {/* Email Field */}
                    <div className='mb-3'>
                        <label className='form-label' style={{ color: 'orange' }}>Email</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            className='form-control' 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                        {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
                    </div>

                    {/* Submit Button */}
                    <button className='btn w-100' style={{ backgroundColor: 'orange', color: 'white' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
