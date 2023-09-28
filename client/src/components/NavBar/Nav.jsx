import React, { useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import style from "./NavBar.module.css";
import {useDispatch } from 'react-redux';
import {getTeams ,getDrivers} from "../../Redux/actions";

function Nav() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeams());
        dispatch(getDrivers());
    }, [ ]);
    const imageUrl = `https://server-zl85.onrender.com/images/logo 2.png`;
    return (
        <div className={style.generalContainer}>
            <div>
                <NavLink to='/home'>
                    <img className={style.imgF1} src={imageUrl}/>
                </NavLink>
                <NavLink to='/register'>
                    <button className={style.regButton}>Register a new legend</button>
                </NavLink>
                <NavLink to='/nation'>
                    <button className={style.natButton}>Register a new nationaliti</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Nav;