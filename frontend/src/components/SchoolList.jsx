import React, { useState } from 'react';
import { getSchools, deleteSchool } from '../api/api';

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });

  const fetchSchools = async () => {
    try {
      const data = await getSchools(coords.latitude, coords.longitude);
      setSchools(data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchool(id);
      setSchools(schools.filter(school => school.id !== id));
      alert('School deleted successfully!');
    } catch (error) {
      alert('Error deleting school');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">School List</h2>

      {/* Latitude & Longitude Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Latitude"
          className="border p-2 rounded w-full"
          value={coords.latitude}
          onChange={(e) => setCoords({ ...coords, latitude: e.target.value })}
        />
        <input
          type="number"
          placeholder="Longitude"
          className="border p-2 rounded w-full"
          value={coords.longitude}
          onChange={(e) => setCoords({ ...coords, longitude: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={fetchSchools}
        >
          Fetch
        </button>
      </div>

      <ul className="space-y-4">
        {schools.map(school => (
          <li key={school.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <h3 className="font-semibold">{school.name}</h3>
              <p>{school.address}</p>
              <p className="text-sm text-gray-500">
                Distance: {school.distance?.toFixed(2)} km
              </p>
            </div>
            <button
              onClick={() => handleDelete(school.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
