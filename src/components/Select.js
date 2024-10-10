import React from "react"
import { useState } from "react";
export default function Select({label, choice, onChange = () => {}, onClick= ()=>{}}){
    const [typeChoice, setTypeChoice] = useState(choice[0]);
    function handleChange(event){
        setTypeChoice(event.target.value);
        onChange(event);
    }
    return (
        <div className="select-container">
            <style jsx>
            {`
                .select-container{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    box-sizing: border-box;
                }

                label{
                    margin-bottom: 5px;
                }

                select{
                    width: 100%;
                    padding: 0.5em 0 0.7em 0.5em;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            `}
            </style>
            <label htmlFor={label}>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
            <select id={label} name={label} onChange={(event)=>handleChange(event)} onClick={() => onClick} value={typeChoice}>
                {choice.map(element => (<option>{element}</option>))}
            </select>
        </div>
    )
}