import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./Landing.module.css";
import { getTeams, getDrivers } from '../../Redux/actions';
import { useDispatch } from 'react-redux';

function LandingPage() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeams());
        dispatch(getDrivers());     
    }, []);

  return (
    <div className={style.generalContainer}>
      <h1>Welcome to Drivers PI</h1>
      <h3>In this PI all time drivers will be displayed and you can search for your favorites, if you can't find them you can add them to the list</h3>
      <Link to="/home">
        <button>Go see the legends</button>
      </Link>
    </div>
  );
}

export default LandingPage;
