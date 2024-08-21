import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Employee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/employee/employees")
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete this employee record?")) {
      axios.delete(`http://localhost:8081/employee/${id}`)
        .then(res => {
          setEmployees(employees.filter(employee => employee.id !== id));
        }).catch(err => console.log(err));
    }
  }

  const handlePrintAll = () => {
    window.open('http://localhost:8081/employee/print-all-employees', '_blank');
  }

  const handlePrintEmployee = (employee) => {
    window.open(`http://localhost:8081/employee/print-employee/${employee.id}`, '_blank');
  }

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Employee List</h3>
        <button onClick={handlePrintAll} className='btn btn-primary'>Print All</button>
      </div>
      <Link to="/add" className='btn btn-success'>Add Employee</Link>
      <div className='table-responsive mt-3'>
        <table className='table'>
          <thead className='table-dark'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Performance Metrics</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.position}</td>
                  <td>{e.department}</td>
                  <td>{e.salary}</td>
                  <td>{e.performance_metrics}</td>
                  <td>
                    <Link to={`/edit/${e.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button onClick={() => handleDelete(e.id)} className='btn btn-warning btn-sm me-2'>Delete</button>
                    <button onClick={() => handlePrintEmployee(e)} className='btn btn-secondary btn-sm'>Print</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
