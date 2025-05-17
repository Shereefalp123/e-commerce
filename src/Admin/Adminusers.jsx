import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Adminusers = () => {
  
  const [users, setUsers] = useState([]);

  
  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const toggleBlock = (userId, currentStatus) => {
    axios.patch(`http://localhost:3000/users/${userId}`, {
      isBlocked: !currentStatus
    })
    .then(() => {
      fetchUsers();
    })
    .catch(err => {
      console.error('Error updating user block status:', err);
    });
  };

  
  const toggleDelete = (userId, currentStatus) => {
    axios.patch(`http://localhost:3000/users/${userId}`, {
      isDeleted: !currentStatus
    })
    .then(() => {
      fetchUsers();
    })
    .catch(err => {
      console.error('Error updating user delete status:', err);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Cart Items</th>
            <th className="border px-4 py-2">Status</th> 
            <th className="border px-4 py-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{Object.keys(user.cart).length}</td>
              <td className="border px-4 py-2">
                <span className={`font-semibold ${
                  user.isDeleted
                    ? 'text-gray-500'
                    : user.isBlocked
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {user.isDeleted ? 'Deleted' : user.isBlocked ? 'Blocked' : 'Active'}
                </span>
              </td>


              <td className="border px-4 py-2">


                {/* ---------------------------------- Block/Unblock Button (disabled if deleted) ---------------------*/}
                <button
                  onClick={() => toggleBlock(user.id, user.isBlocked)}
                  className={`px-3 py-1 rounded text-white mr-2 ${
                    user.isBlocked ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  disabled={user.isDeleted}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>




                {/* --------------------------Delete/Restore Button -----------=====--------------------------*/}
                <button
                  onClick={() => toggleDelete(user.id, user.isDeleted)}
                  className={`px-3 py-1 rounded text-white ${
                    user.isDeleted ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  {user.isDeleted ? 'Restore' : 'Delete'}
                </button>

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminusers;
