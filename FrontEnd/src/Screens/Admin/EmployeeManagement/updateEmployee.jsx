import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateEmployee() {
    const { id } = useParams(); 
    const [Id, setId] = useState(''); 
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); 
    
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const  data  = await axios.get(`http://localhost:8800/employee/display`);

                

                console.log('Employee data:', data);


             
                
                setId(data.id); 
                setName(data.Name);
                setAddress(data.Address);
                setPhone(data['Phone no.']);
                setEmail(data['e-Mail']);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
    
        fetchEmployee();
    }, [id]);
    

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
                navigate('/');
            })
            .catch(err => {
                console.error('Error updating employee:', err);
                alert('Failed to update employee. Please try again.'); 
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>UPDATE EMPLOYEE</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='mb-2'>
                        <label>ID</label>
                        <input 
                            type='number' 
                            value={Id} 
                            className='form-control' 
                            onChange={e => setId(e.target.value)} 
                            disabled 
                        />
                    </div>
                    <div className='mb-2'>
                        <label>NAME</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                            value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label>ADDRESS</label>
                        <input type="text" placeholder='Enter Address' className='form-control'
                            value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label>PHONE NUMBER</label>
                        <input type="text" placeholder='Enter phone number' className='form-control'
                            value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label>EMAIL</label>
                        <input type="email" placeholder='Enter Email' className='form-control'
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>UPDATE</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployee;
