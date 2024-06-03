import './App.css'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Home from './pages/home.jsx';
import NavbarLayout from './pages/NavbarLayout.jsx';
import Settings from './pages/settings.jsx';
import AddTask from './pages/addTask.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/signUp.jsx';
import EditTask from './pages/editTask.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavbarLayout />}>
        <Route path = "/" element={<Home />} />
        <Route path = "dashboard" element={<Home />} />
        <Route path="addTask" element={<AddTask />} />
        <Route path = "settings" element={<Settings />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="editTask" element={<EditTask />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App