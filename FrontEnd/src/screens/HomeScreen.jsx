import MapWithDirection from "../components/MapWithDirection";
import Home from './../components/Home/Home';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isLoggedIn } from "./auth/auth";

const HomeScreen = ()  => {
    const navigate = useNavigate();

    const [lotData, setLotData] = useState([]);

    useEffect(() => {
      if (!isLoggedIn()) {
          navigate('/login');
      }
  }, [navigate]);
    
    return (
    <div className='row'>
      <div className='col-12 col-md'>
        <Home lotData={lotData}/>
      </div>
      <div className='col-12 col-md-5' style={{height: '100vh'}}>
        <MapWithDirection 
        // from='Neelaya society, Talegaon Dabhade, Pune, Maharashtra' 
        // to='Sunbeam info tech, Pune, Maharashtra'
        setLotData={setLotData}
        />
      </div>
    </div>  
    );
}

export default HomeScreen;