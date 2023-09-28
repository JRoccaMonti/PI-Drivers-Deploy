import React, { useEffect, useState } from 'react';
import { services } from '../../apiHelpers/index';
import { useParams } from 'react-router-dom';
import style from "./Detail.module.css";
import {getTeams ,getDrivers} from "../../Redux/actions";
import {useDispatch } from 'react-redux';

function DetailPage() {
    const { id } = useParams();
    const [driver, setDriver] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTeams());
        dispatch(getDrivers());
      }, [ ]);

    useEffect(() => {
        services.getDetails(id)
        .then((data) => {
          setDriver(data);
        })
        .catch((error) => {
          console.error('Error fetching driver data:', error);
        });
  
      // Limpieza del estado al desmontar el componente
      return () => {
        setDriver({});
      };
    }, [id]);
    console.log(driver);
    return (
      <div className={style.containerBox}> 
        <div className={style.titleBox}>
          <h3>{typeof driver.name === 'object' ? driver.name.forename : driver.name || 'N/A'} {driver.lastname || (driver.name && driver.name.surname) || "No contenido en data.js"} "{driver.code || ""}"</h3>
        </div>
        <div className={style.dataBox}>
            <div className={style.nationBox}>
              <p>Nationality: </p>
              <p>{driver.nationality}</p>
            </div>
            <div className={style.birthdateBox}>
              <p>Birthdate: </p>
              <p>{driver.birthdate|| driver.dob}</p>
            </div>
            <div className={style.teamBox}>
              <p>Teams: </p>
              <p>{driver.teams}</p>
            </div>
            <p className={style.descriptionBox}>{driver.description || "Description not available"}</p>
        </div>
        <div className={style.imgBox}>
          <img className={style.imgRender} src={typeof driver.image === 'object' ? driver.image.url : driver.image || "http://192.168.1.83:3001/images/driversDB/logo.png"}/>
        </div>
        <div className={style.footerBox} >
          <div className={style.wikiBox}>
           <a  href={driver.url || ""}>Wiki</a> 
          </div>
          <div className={style.idBox}>
            <p>Id: {driver.id}</p>
          </div>       
        </div>
      </div>
    );
  }
  
  export default DetailPage;