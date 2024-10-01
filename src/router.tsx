import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import BookPage from "./pages/BookPage.tsx";

 const router = createBrowserRouter([
    
    {
        path:"dashboard",
        element:<DashboardLayout/>,
        children:[
            {
                path:"home",
                element:<HomePage/>
            },
            {
                path:"books",
                element:<BookPage/>
            }
            
        ],
        
    },
    {
    path:"/login",
    element:<LoginPage/>
},
{
    path:"/register",
    element:<RegisterPage/>
}

])
export default router;
