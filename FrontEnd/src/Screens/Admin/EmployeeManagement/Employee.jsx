import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Employee() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/employee/display')
            .then(res => {
                console.log(res.data);
                setEmployee(res.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = async (id) => {

        console.log(id);
        try {
            await axios.delete('http://localhost:8800/delete/employee/'+id);
            setEmployee(employee.filter(emp => emp.id !== id));  
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <Link to="/employee/create" className='btn btn-success'>Add +</Link>
                        <Link to="/UpdateSchedule" className='btn btn-info ms-2'>SHOW SCHEDULE</Link>
                    </div>
                    <div className="bg-light p-3 rounded">
                        <h4>Total Employees: {employee.length}</h4> 
                    </div>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th className='action-column'>Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((data, i) => (
                                <tr key={i}>
                                    <td>{data['id']}</td>
                                    <td>{data['Name']}</td>
                                    <td>{data['Address']}</td>
                                    <td>{data['Phoneno']}</td>
                                    <td>{data['Email']}</td>
                                    <td className='action-column'> 
                                        <Link to={`/employee/update/${data.id}`} className='btn btn-primary'>UPDATE</Link>
                                        <button className='btn btn-danger ms-2' onClick={() => handleDelete(data.id)}>DELETE</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;
