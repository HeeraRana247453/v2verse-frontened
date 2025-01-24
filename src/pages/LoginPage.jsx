import { useEffect } from 'react';
import Login from "../components/Login/Login.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((store) => store.user);
    useEffect(() => {
      console.log("isAuthenticated: ",isAuthenticated);
        if(isAuthenticated === true){
            navigate("/");
        }
    }, [isAuthenticated]);

  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage