import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { services } from '../../apiHelpers/index';
import validateField from "./Validations";
import style from "./FormDrive.module.css";
import {useDispatch } from 'react-redux';
import {getDrivers} from "../../Redux/actions";

function DriverRegistration() {
    const dispatch = useDispatch();
    const teamOptions = useSelector(state => state.teams);
    const nationalityOptions = useSelector(state => state.nationalitys);  
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        description: '',
        nationality: '',
        image: '',
        birthdate: '',
        teamId: []
    });
    const [formErrors, setFormErrors] = useState({
        name: '', 
        lastname: '',
        description: '',
        nationality: '',
        image: '',
        birthdate: '',
        teamId: '',
    });
    const validateForm = () => {
        const errors = {};
        // Validar cada campo utilizando la función de validación genérica
        for (const fieldName in formData) {
        if (Object.hasOwnProperty.call(formData, fieldName)) {
            const value = formData[fieldName];
            const errorMessage = validateField(fieldName, value);
            errors[fieldName] = errorMessage;
        }
        }
        return errors;
    }; 

    const hasErrors = Object.values(formErrors).some(value => value !== '');

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errors = validateForm();
        setFormErrors(errors);
        setFormData({ ...formData, [name]: value });
    };       
    const handleTeamChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => parseInt(option.value, 10));
        setFormData({ ...formData, teamId: selectedOptions });
    };   
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
           const reader = new FileReader();
           reader.onload = (event) => {
              setFormData({ ...formData, image: event.target.result });
           };
           reader.readAsDataURL(file);
        }
    };  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasErrors = Object.values(formErrors).some((error) => error !== '');
        if (hasErrors) {
            alert('The form has errors. It can not be sent.');
            return;
        }
    
        try {
            const response = await services.newDriver(formData);
            dispatch(getDrivers());
            alert('Successful registration:', response);
            setFormData({
                name: '',
                lastname: '',
                description: '',
                nationality: '',
                image: '',
                birthdate: '',
                teamId: []
            });
        } catch (error) {
            console.log(error);
            const text = error.response.data.message.join(' ')
            console.log(text);
            alert(text);
        }
    };
    
    useEffect(() => {
        const errors = validateForm();
        setFormErrors(errors);
    },[]);

    useEffect(() => {
        const errors = validateForm();
        setFormErrors(errors);
    },[formData]);

    return (
        <>
        <div className={style.containerBox}>
            <h2 className={style.title}>Register New Driver</h2>
            <form className={style.formBox} onSubmit={handleSubmit}  encType="multipart/form-data">
            <>
                <div className={style.dataBox}>
                    <label className={style.datalabelBox}>
                        Name: <input className={style.inputBox} type="text" name="name" value={formData.name} onChange={handleChange} />
                        {formErrors.name && (<div>{formErrors.name}</div>)}
                    </label>
                    <label className={style.datalabelBox}>
                        Last name: <input className={style.inputBox} type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                        {formErrors.lastname && (<div>{formErrors.lastname}</div>)}
                    </label>
                    <label className={style.datalabelBox}>
                        Description: <input className={style.inputBox} type="text" name="description" value={formData.description} onChange={handleChange} />
                        {formErrors.description && (<div>{formErrors.description}</div>)}
                    </label>
                    <label className={style.datalabelBox}>
                        Nationality: 
                        <select className={style.selectBox} name="nationality" value={formData.nationality} onChange={handleChange}>
                            <option value="Not select">Not select</option>
                        {nationalityOptions.map((option) => (
                            <option key={option.value} value={option.text}>
                                {option.text}
                            </option>
                            ))}
                        </select>
                        {formErrors.nationality && (<div>{formErrors.nationality}</div>)}
                    </label>
                    <label className={style.datalabelBox}>
                        Birthdate: <input className={style.inputBox} type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                        {formErrors.birthdate && (<div>{formErrors.birthdate}</div>)}
                    </label>
                    <label className={style.datalabelBox}>
                        Image: <input  type="file" accept="image/*" onChange={handleImageChange} />
                        {formErrors.image && (<div>{formErrors.image}</div>)}
                    </label>
                </div>

                <div className={style.imgBox} >
                        {formData.image && <img className={style.imgRender} src={formData.image} alt="Preview" />}
                </div>

                <div className={style.loadBox}>
                    <label className={style.labelBox}>
                        Teams: 
                        <select className={style.selectTeam} name="teamId" multiple value={formData.teamId} onChange={handleTeamChange}>
                            {teamOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                            ))}
                        </select>
                        {formErrors.teamId && (<div>{formErrors.teamId}</div>)}
                    </label>
                    <button className={style.buttonSubmit} type="submit" disabled={hasErrors}>Register new driver</button>
                </div>                
            </>
            </form>
        </div>
        </>
    );
}

export default DriverRegistration;