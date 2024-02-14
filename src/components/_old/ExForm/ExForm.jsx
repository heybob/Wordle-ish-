import React, { useEffect, useReducer, useState } from "react";
import './ExForm.css';
import {FormReducer} from './reducer';
import { formSubmitted } from "./actions";

const formInit = {
    firstName: '',
    lastName: '',
}

export function ExForm(props) {
    const [form, setForm] = useState(formInit)
    const [state, dispatch] = useReducer(FormReducer, {formSubmitted: false})
    const [selectedRadio, setSelectedRadio] = useState('option 1')

    useEffect(()=> {
        console.log(state.formSubmitted);
    },[state, dispatch, state.formSubmitted]);

    useEffect(()=> {

    }, [selectedRadio]);

    function handleFormChange(e) {
        setForm({...form,
            [e.target.name]: e.target.value});
    }

    function handleSubmit() {
        //alert(`${form.firstName}, ${form.lastName}`);
        dispatch(formSubmitted());

    }
    function handleRadios(e) {
        setSelectedRadio(e.target.value)
    }
    return (
        <>
        <form className="my-form" >
            <label>First Name
            <input type='text' onChange={(e) => handleFormChange(e)} name="firstName" value={form.firstName} placeholder="Enter First Name"/>
            </label>
            <label>Last Name
            <input type='text' onChange={(e) => handleFormChange(e)} name="lastName" value={form.lastName} placeholder="Enter Last Name"/>
            </label>
            <label> Option 1
            <input name="Option 1" type="radio" value="option 1" onChange={(e) => handleRadios(e)} checked={selectedRadio === 'option 1'} />
            </label>
            <label> Option 2
            <input name="Option 2" type="radio" value="option 2" onChange={(e) => handleRadios(e)} checked={selectedRadio === 'option 2'} />
            </label>
            <label> Option 3
            <input name="Option 3" type="radio" value="option 3" onChange={(e) => handleRadios(e)} checked={selectedRadio === 'option 3'} />
            </label>
        </form>
        <div>
            <button onClick={() => {handleSubmit()}}>Submit Form</button>
            <div>
                <h1>Form Values</h1>
            </div>
            <p>FirstName: {form.firstName}</p>
            <p>LastName: {form.lastName}</p>
        </div>
        </>
    )
}