import React from 'react';
import AddSchool from './components/AddSchool';
import SchoolList from './components/SchoolList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <AddSchool />
      <SchoolList />
    </div>
  );
};

export default App;
