import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/auth/user');
      setUser(res.data.user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-neon mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example of a Dashboard card */}
        <div className="bg-gray-900 p-6 rounded-md shadow-lg border border-neon hover:bg-gray-800 transition-all">
          <h2 className="text-2xl font-semibold mb-4">Manage Bot</h2>
          <p className="text-gray-400 mb-6">Modify bot settings and commands.</p>
          <button className="px-4 py-2 bg-neon text-black rounded-md hover:bg-white transition-colors">
            Settings
          </button>
        </div>
        {/* Repeat more cards as needed */}
      </div>
    </div>
  </div>
  );
};

export default Dashboard;