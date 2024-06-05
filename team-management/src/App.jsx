import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import NavbarLayout from './components/NavbarLayout.jsx';
import Settings from './pages/settings.jsx';
import AddTask from './pages/addTask.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import EditTask from './pages/editTask.jsx';
import SignOut from './pages/signOut.jsx';
import { loggedIn } from './components/authentication.js';
import UserContext from './components/userContext.jsx';

//login check request
const login = await loggedIn()



function App() {
  //error handle connecting to backend
  if (login == null){
    return <h1>Failed to connect to server, come back again later, sorry for the inconvenience</h1>
  }

  const [user, setUser] = useState(login);

  const loginUser = () => {
    setUser(true);
  };

  const logoutUser = () => {
    setUser(false);
  };

  //if user does not have a default sort value
  if (!localStorage.getItem("defaultSortOrder")) {
    localStorage.setItem("defaultSortOrder","taskDateAsc");
  }

  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme","light");
  }

  function RequireAuth({ children }) {

    if (!user) {
      // Redirect to login if not logged in
      return <Navigate to="/login" />;
    }

    return children;
  }


  const router = createBrowserRouter(

    createRoutesFromElements(

      <Route path="/" element={<NavbarLayout />}>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="dashboard" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="addTask" element={<RequireAuth><AddTask /></RequireAuth>} />
        <Route path="settings" element={<RequireAuth><Settings /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="editTask" element={<RequireAuth><EditTask /></RequireAuth>} />
        <Route path="signOut" element={<SignOut />} />
      </Route>
    )

  )

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App