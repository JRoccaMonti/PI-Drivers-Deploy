import React, { useEffect, useState } from 'react';
import { services } from '../../apiHelpers/index';
import validateField from "./Validations";
import {useDispatch } from 'react-redux';
import {getTeams} from "../../Redux/actions";

function NationalityRegister() {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nationality: ''
    });
    const [formErrors, setFormErrors] = useState({
        nationality: ''
    });

    const validateForm = () => {
        const errors = {};
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasErrors = Object.values(formErrors).some((error) => error !== '');
        if (hasErrors) {
            alert('The form has errors. It can not be sentr.');
            return;
        }
    
        try {
            const response = await services.newNationality(formData);
            dispatch(getTeams());
            alert('Successful registration:', response);
            setFormData({
                nationality: ''
            });
        } catch (error) {
            console.log(error.response.data.message);
            const text = error.response.data.message.join(' ')
            console.log(text);
            alert(text);
        }
    };

    return(
        <>
        <div>
            <h2>Register New nationality</h2>
            <form  onSubmit={handleSubmit}>
                <label>
                    Nationality: 
                    <input  type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                    {formErrors.nationality && (<div>{formErrors.nationality}</div>)}
                </label>
                <button type="submit" disabled={hasErrors}>Register new nationality</button>
            </form>
        </div>
        
        
        </>
    );


};

export default NationalityRegister;