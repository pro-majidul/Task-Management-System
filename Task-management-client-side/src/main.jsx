import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './page/login/Login.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import AuthProvider from './provider/AuthProvider.jsx';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
