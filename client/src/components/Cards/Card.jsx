import React, { useState, useEffect } from 'react';
import style from "./Card.module.css";
import { NavLink } from 'react-router-dom';

function Card({driver}) {

    const allteams = driver.teams.split(',').join(', ')

    return (
        <div className={style.container}>
            <div>
                <img className={style.ima} src={typeof driver.image === 'object' ? driver.image.url : driver.image }/>
                <div className={style.infoBox}>
                    <NavLink to={`/detail/${driver.id}`} >
                        <h4 className={style.name}>{typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'} {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"}</h4>
                    </NavLink>
                    <p className={style.teams}>Teams: </p>
                    <p className={style.teamsList}>{allteams || "No contenido en data.js"}</p>
                </div>
            </div>
        </div>
    );
}
export default Card;