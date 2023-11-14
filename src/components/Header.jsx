import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="px-4 text-right">
        <p
          className="font-['Lobster'] text-xl py-5 mobile:py-2 bg-gradient-to-r from-[#1D1CE5] via-[#7978FF] to-[#C47AFF] text-transparent inline-block text-transparent bg-clip-text"
          onClick={() => navigate('/')}
        >
          Simple Playlist
        </p>
      </div>
    </header>
  );
};

export default Header;
