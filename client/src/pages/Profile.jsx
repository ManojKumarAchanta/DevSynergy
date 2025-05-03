import { useVerifyEmailMutation } from '@/store/services/authApi';
import { BadgeX } from 'lucide-react';
import { VerifiedIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EmailVerification from './auth/model/EmailVerification';

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verifyEmail, { isError, isLoading }] = useVerifyEmailMutation();
  const [avatar, setAvatar] = useState(user?.avatarUrl);

  const handleVerify = async () => {
    try {
      const res = await verifyEmail();
      if (res.success) {
        toast.success('Email sent!');
      }
    } catch (error) {
      toast.error('Failed to send verification mail');
      console.log(error.message);
    }
  };

  const handleModalClose = () => {
    setShowVerificationModal(false);
    navigate('/home');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optionally add file upload functionality here
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        // Example API call for uploading profile picture
        const response = await axios.post('/api/upload-avatar', formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data.success) {
          setAvatar(response.data.avatarUrl);  // Update avatar state
          toast.success('Avatar uploaded!');
        }
      } catch (error) {
        toast.error('Failed to upload avatar');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {user?.name || 'User'}!
          </h1>

          {user && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatar || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="profile-avatar-upload"
                />
                <label htmlFor="profile-avatar-upload" className="cursor-pointer text-blue-500">
                  Change Avatar
                </label>

                <div>
                  <h2 className="text-xl font-semibold flex items-center">
                    @{user.username}{' '}
                    {!user.isEmailVerified ? (
                      <div className="flex gap-2">
                        <BadgeX className="ml-2" stroke="red" />
                        <Link onClick={handleVerify}>verify now</Link>
                      </div>
                    ) : (
                      <VerifiedIcon className="ml-2" stroke="blue" />
                    )}
                  </h2>
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
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
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

          <EmailVerification
            isOpen={showVerificationModal}
            onClose={handleModalClose}
            email={user ? user.email : 'user@example.com'}
          />
        </div>
      </div>  
    </div>
  );
};

export default Profile;
