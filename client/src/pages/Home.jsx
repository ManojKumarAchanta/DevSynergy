import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}!</h1>
          
          {user && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatarUrl || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">@{user.username}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-gray-600">{user.bio || 'No bio added yet.'}</p>
              </div>

              {user.techStack && user.techStack.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold">{user.followers?.length || 0}</div>
                  <div className="text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="font-semibold">{user.following?.length || 0}</div>
                  <div className="text-gray-600">Following</div>
                </div>
                <div>
                  <div className="font-semibold">{user.projects?.length || 0}</div>
                  <div className="text-gray-600">Projects</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 