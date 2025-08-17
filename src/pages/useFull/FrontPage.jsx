import React from 'react';
import { useNavigate } from 'react-router-dom';
import './frontPage.css'; // Import the CSS file

const FrontPage = () => {
  const navigate = useNavigate();

  const UsersType = [
    { name: "Customer", route: "/userSignIn" },
    { name: "Owner", route: "/ownerLogin" },
    { name: "Delivery Partner", route: "/partnerlogin" }
  ];

  return (
    <div className="frontpage-container">
      <div className="box-wrapper">
        {UsersType.map((user, i) => (
          <div
            key={i}
            className="user-box"
            onClick={() => navigate(user.route)}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
