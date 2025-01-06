import React from "react";
import "./ToFromInputs.css"

export default function({name, reverse=false, input1, input2, ...props}){
    const from = reverse ? `from ${name}` : `${name} from`
    const to = reverse ? `to ${name}` : `${name} to`

    return (
        <div className="to-from-container">
            <label htmlFor={from.replace(" ", "-")}>{from}</label>
            <input {...props} 
            {...input1} 
            id={from.replace(" ", "-")}
            name={`from-${name}`}
            />
            <label htmlFor={to.replace(" ", "-")}>{to}</label>
            <input {...props} 
                {...input2} 
                id={to.replace(" ", "-")}
                name={`to-${name}`}
            />
        </div>
    )
}