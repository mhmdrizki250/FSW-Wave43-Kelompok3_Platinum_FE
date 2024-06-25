// import React from 'react';
// import { Link } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to the React App</h1>
//       <nav>
//         <Link to="/register">Register</Link>
//         <br />
//         <Link to="/login">Login</Link>
//         <br />
//         <Link to="/admin-dashboard">Admin Dashboard</Link>
//         <br />
//         <Link to="/user-dashboard">User Dashboard</Link>
//       </nav>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the React App</h1>
      <nav className="nav justify-content-center">
        <Link className="nav-link" to="/register">Register</Link>
        <Link className="nav-link" to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default App;

