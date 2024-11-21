import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const userId = useParams()
  console.log(userId.userId);
  return (
    <div>
      ProfilePage of {userId.userId}
    </div>
  );
}

export default ProfilePage;
