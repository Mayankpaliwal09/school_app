import React, { useState } from 'react';
import { addSchool } from '../api/api';

const AddSchool = () => {
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSchool(schoolData);
      setSchoolData({
        name: '',
        address: '',
        latitude: '',
        longitude: ''
      });
      alert('School added successfully!');
    } catch (error) {
      alert('Error adding school');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Add School</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="School Name"
          value={schoolData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="School Address"
          value={schoolData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={schoolData.latitude}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={schoolData.longitude}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add School</button>
      </form>
    </div>
  );
};

export default AddSchool;
