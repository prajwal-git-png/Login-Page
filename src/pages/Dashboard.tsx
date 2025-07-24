import React from 'react';
import { useAuth } from '../components/AuthContext';
import { LogOutIcon, UserIcon, HomeIcon, SettingsIcon, BarChart2Icon, UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const stats = [{
    name: 'Total Users',
    value: '2,543',
    icon: <UsersIcon className="h-6 w-6" />
  }, {
    name: 'Active Projects',
    value: '12',
    icon: <BarChart2Icon className="h-6 w-6" />
  }, {
    name: 'Tasks Completed',
    value: '78%',
    icon: <SettingsIcon className="h-6 w-6" />
  }, {
    name: 'New Messages',
    value: '5',
    icon: <SettingsIcon className="h-6 w-6" />
  }];
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <LogOutIcon className="h-4 w-4 mr-1" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard overview */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3 text-white">
                          {stat.icon}
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {stat.name}
                            </dt>
                            <dd className="text-lg font-semibold text-gray-900">
                              {stat.value}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
              {/* Recent activity section */}
              <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
                <div className="mt-4 bg-white shadow overflow-hidden rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {[1, 2, 3].map(item => <li key={item} className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-500" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Activity {item}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {item} hour{item !== 1 ? 's' : ''} ago
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Dashboard;