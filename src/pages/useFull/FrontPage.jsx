import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate(); // Uncomment if you use react-router-dom

  // SVG components for role icons
  const CustomerIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="user-svg-icon">
      <circle cx="32" cy="20" r="8" fill="#F39C12"/>
      <path d="M22 54C22 42.9543 32 34 32 34C32 34 42 42.9543 42 54H22Z" fill="#3498DB"/>
      <path d="M40 38C40 34.6863 42.6863 32 46 32H50C53.3137 32 56 34.6863 56 38V42H40V38Z" fill="#D35400"/>
      <rect x="40" y="42" width="16" height="4" fill="#E67E22"/>
      <rect x="40" y="46" width="16" height="3" fill="#2ECC71"/>
      <path d="M40 49C40 52.3137 42.6863 55 46 55H50C53.3137 55 56 52.3137 56 49V46H40V49Z" fill="#D35400"/>
    </svg>
  );

  const OwnerIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="user-svg-icon">
      <rect x="8" y="22" width="48" height="34" fill="#3498DB" rx="2"/>
      <path d="M4 22H60L56 12H8L4 22Z" fill="#E74C3C"/>
      <path d="M6 17H58" stroke="#ECF0F1" strokeWidth="2"/>
      <rect x="20" y="32" width="24" height="24" fill="#2C3E50"/>
      <circle cx="32" cy="12" r="6" fill="#F1C40F"/>
      <path d="M28 56V42H36V56" stroke="#F1C40F" strokeWidth="2"/>
    </svg>
  );

  const PartnerIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="user-svg-icon">
        <path d="M29 51C22.3726 51 17 45.6274 17 39V33H31L43 42H51V51H29Z" fill="#E74C3C"/>
        <path d="M31 33H17L23 21H35L31 33Z" fill="#C0392B"/>
        <circle cx="23" cy="51" r="7" fill="#2C3E50" stroke="#ECF0F1" strokeWidth="2"/>
        <circle cx="51" cy="51" r="7" fill="#2C3E50" stroke="#ECF0F1" strokeWidth="2"/>
        <circle cx="37" cy="23" r="7" fill="#F39C12"/>
        <path d="M37 30C34.3333 35 34.3333 42 37 47H43C45.6667 42 45.6667 35 43 30H37Z" fill="#3498DB"/>
    </svg>
  );

  const UsersType = [
    { name: 'Customer', route: '/userSignIn', key: 'customer', icon: <CustomerIcon /> },
    { name: 'Owner', route: '/ownerLogin', key: 'owner', icon: <OwnerIcon /> },
    { name: 'Delivery Partner', route: '/partnerlogin', key: 'partner', icon: <PartnerIcon /> },
  ];

  const handleNavigate = (route) => {
    console.log(`Navigating to: ${route}`);
    navigate(route);
  };

  return (
    <>
      {/* CSS is now embedded in the component to resolve the import error */}
      <style>{`
        /* ===== Reset & base ===== */
        * { 
          box-sizing: border-box; 
        }
        html, body, #root { 
          height: 100%; 
        }
        body {
          margin: 0;
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
          color: #0b2942;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ===== Layout & background ===== */
        .frontpage {
          min-height: 100vh;
          display: grid;
          grid-template-rows: 1fr auto;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(1200px 1200px at -10% -10%, #b3ecff 0%, #e6fbff 40%, transparent 41%),
            radial-gradient(900px 900px at 110% 10%, #ffe6c7 0%, #fff3e5 45%, transparent 46%),
            linear-gradient(135deg, #a0dfff 0%, #d0f4ff 50%, #f7fcff 100%);
        }

        /* ===== Floating food items animation (Updated) ===== */
        .frontpage::before {
          content: "";
          position: absolute;
          inset: -10vh -10vw;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
          background-repeat: no-repeat;
          background-image:
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><text y='48' font-size='48'>🍕</text></svg>"),
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><text y='46' font-size='46'>🍔</text></svg>"),
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='58' height='58'><text y='44' font-size='44'>🍛</text></svg>"), /* Biryani */
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='54' height='54'><text y='40' font-size='40'>🥘</text></svg>"), /* Chole Bhature representation */
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><text y='42' font-size='42'>🍹</text></svg>"), /* Cocktail */
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><text y='38' font-size='38'>🌯</text></svg>");
          background-position: 8% 20%, 25% 10%, 60% 15%, 85% 25%, 40% 8%, 15% 30%;
          animation: driftScatter 25s linear infinite alternate;
        }

        @keyframes driftScatter {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(2vw, -3vh) rotate(5deg); }
        }

        /* Centered content */
        .frontpage-inner {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 24px 16px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
        }

        /* ===== Role cards ===== */
        .box-wrapper {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 900px;
        }

        .user-box {
          --card-bg: rgba(255, 255, 255, 0.8);
          --card-border: rgba(255, 255, 255, 0.9);

          background-color: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #0b2942;
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 12px;
          min-width: min(100%, 240px);
          max-width: 280px;
          flex: 1 1 240px;

          display: grid;
          grid-template-columns: 48px 1fr;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(18, 86, 120, 0.15);
          transition: transform 240ms ease, box-shadow 240ms ease;
          outline: none;
          animation: cardIn 600ms cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes cardIn {
          0% { transform: translateY(16px) scale(.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        .user-icon {
          grid-row: span 2;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .user-svg-icon { 
          width: 36px; 
          height: 36px; 
        }
        .user-texts { 
          display: grid; 
          gap: 2px; 
        }
        .user-title { 
          font-weight: 700; 
          font-size: 17px; 
        }
        .user-desc { 
          font-size: 13px; 
          color: #3a6d86; 
        }

        .user-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(18, 86, 120, 0.2);
        }
        .user-box:active { 
          transform: translateY(-2px) scale(.98); 
        }
        .user-box:focus-visible {
          box-shadow: 0 0 0 2px rgba(255,255,255,.95), 0 0 0 4px rgba(0,153,204,.5);
          border-color: rgba(0,153,204,.6);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 12px 12px 20px;
          color: #2e5b73;
          opacity: 0.9;
          position: relative;
          z-index: 2;
        }

        /* ===== Animated Scene ===== */
        .scene-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .scene-svg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50vh;
          min-height: 300px;
          max-height: 500px;
          overflow: visible;
        }

        #road-path { 
          fill: none; 
          stroke: #bdc3c7; 
          stroke-width: 45; 
          stroke-linecap: round; 
        }
        #road-line { 
          fill: none; 
          stroke: #ecf0f1; 
          stroke-width: 4; 
          stroke-dasharray: 20 30; 
        }
        #delivery-partner-bg { 
          animation: ride-linear 15s linear infinite; 
        }

        @keyframes ride-linear {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(2020px); }
        }

        .building { 
          fill: #d0e0e3; 
          stroke: #a7b4b7; 
          stroke-width:2; 
        }
        .building-darker { 
          fill: #b8c8cc; 
        }
        .tree-trunk { 
          fill: #8d6e63; 
        }
        .tree-leaves { 
          fill: #66bb6a; 
        }
        .person-group { 
          animation: gentle-bob 4s ease-in-out infinite alternate; 
        }

        @keyframes gentle-bob {
            from { transform: translateY(0) rotate(-1deg); }
            to { transform: translateY(-3px) rotate(1deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .box-wrapper { 
            flex-direction: column; 
            gap: 12px; 
          }
          .user-box { 
            min-width: 90%; 
          }
          #delivery-partner-bg { 
            transform: scale(0.8); 
          }
          #road-path { 
            stroke-width: 35; 
          }
        }
      `}</style>
      <main className="frontpage">
        <div className="scene-container" aria-hidden="true">
          <svg className="scene-svg" viewBox="0 0 1920 400" preserveAspectRatio="xMidYMax slice">
            <g id="cityscape">
                {/* House 1 */}
                <g transform="translate(150, 180) scale(0.8)">
                    <rect x="0" y="0" width="150" height="120" className="building" />
                    <polygon points="0,0 150,0 75,-60" className="building-darker" />
                </g>
                
                {/* NEW: Restaurant */}
                <g transform="translate(580, 160)">
                    <rect x="0" y="0" width="200" height="140" className="building" />
                    <rect x="0" y="0" width="200" height="20" fill="#c0392b" />
                    <rect x="10" y="30" width="180" height="80" fill="#2c3e50" />
                     <text x="100" y="125" textAnchor="middle" fontSize="18" fill="#2c3e50" fontFamily="Arial">RESTAURANT</text>
                </g>

                {/* Tree */}
                <g transform="translate(300, 240)">
                    <rect x="-5" y="0" width="10" height="40" className="tree-trunk" />
                    <circle cx="0" cy="-20" r="30" className="tree-leaves" />
                </g>

                {/* NEW: Taller Building */}
                <g transform="translate(1100, 100)">
                    <rect x="0" y="0" width="120" height="200" className="building" />
                    <rect x="20" y="20" width="30" height="30" fill="#b8c8cc" />
                    <rect x="70" y="20" width="30" height="30" fill="#b8c8cc" />
                    <rect x="20" y="70" width="30" height="30" fill="#b8c8cc" />
                    <rect x="70" y="70" width="30" height="30" fill="#b8c8cc" />
                    <rect x="20" y="120" width="30" height="30" fill="#b8c8cc" />
                    <rect x="70" y="120" width="30" height="30" fill="#b8c8cc" />
                </g>

                {/* Delivery Target House */}
                 <g transform="translate(1650, 150) scale(1.1)">
                    <rect x="0" y="0" width="150" height="150" className="building" />
                    <polygon points="0,0 150,0 75,-70" className="building-darker" />
                    <rect x="55" y="90" width="40" height="60" className="building-darker" />
                </g>

                {/* People Group 1 */}
                <g className="person-group" transform="translate(450, 250)">
                    <circle cx="0" cy="0" r="15" fill="#f4a261"/>
                    <circle cx="40" cy="0" r="15" fill="#e76f51"/>
                    <rect x="-15" y="15" width="70" height="15" fill="#a98467" rx="5"/>
                    <text x="13" y="-5" fontSize="12">🍕</text>
                </g>

                {/* NEW: People Group 2 */}
                <g className="person-group" transform="translate(850, 260) scale(0.9)">
                    <circle cx="0" cy="0" r="15" fill="#8e44ad"/>
                    <circle cx="40" cy="0" r="15" fill="#2980b9"/>
                    <rect x="-15" y="15" width="70" height="15" fill="#7f8c8d" rx="5"/>
                    <text x="0" y="-5" fontSize="12">🍔</text>
                    <text x="30" y="-5" fontSize="12">🍹</text>
                </g>
            </g>

            <path id="road-path" d="M -100,250 L 2020,250" />
            <path id="road-line" d="M -100,250 L 2020,250" />

            <g id="delivery-partner-bg" transform="translate(0, 170) scale(0.5)">
                <path d="M 65,135 C 40,135 20,120 20,100 L 20,80 L 70,80 L 110,110 L 140,110 L 140,135 Z" fill="#e74c3c"/>
                <path d="M 70,80 L 20,80 L 40,50 L 80,50 Z" fill="#c0392b"/>
                <rect x="135" y="105" width="20" height="15" fill="#34495e" rx="5"/>
                <circle cx="50" cy="135" r="20" fill="#2c3e50" stroke="#ecf0f1" strokeWidth="4"/>
                <circle cx="150" cy="135" r="20" fill="#2c3e50" stroke="#ecf0f1" strokeWidth="4"/>
                <circle cx="90" cy="55" r="20" fill="#f39c12"/>
                <path d="M 90,75 C 80,90 80,110 90,120 L 110,120 C 120,110 120,90 110,75 Z" fill="#3498db"/>
                <rect x="55" y="45" width="20" height="8" fill="#2c3e50" rx="4"/>
            </g>
          </svg>
        </div>

        <div className="frontpage-inner">
          <section className="box-wrapper" aria-label="Choose role">
            {UsersType.map((user, i) => (
              <div
                key={i}
                className="user-box"
                onClick={() => handleNavigate(user.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate(user.route);
                  }
                }}
                aria-label={`${user.name} login`}
              >
                <div className="user-icon" aria-hidden="true">
                  {user.icon}
                </div>
                <div className="user-texts">
                  <span className="user-title">{user.name}</span>
                  <span className="user-desc">
                    {user.name === 'Customer' && 'Order food'}
                    {user.name === 'Owner' && 'Manage outlet'}
                    {user.name === 'Delivery Partner' && 'Start delivering'}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>

        <footer className="footer">
          <small>© {new Date().getFullYear()} FoodFast</small>
        </footer>
      </main>
    </>
  );
};

export default FrontPage;
