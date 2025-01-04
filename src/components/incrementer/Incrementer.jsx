import React from "react";
import PlusIcon from "../PlusIcon";
import MinusIcon from "../MinusIcon";
import "./incrementer.css"

export default function({setIncrement, ...props}){
    return (
        <div className="incrementer-container">
            <input {...props} id="travellers" className="traveller-input" type="number" name="travellers"/>
            <button onClick={(e) => setIncrement(e, 1)} className="increment-decrement increment">
                <PlusIcon className="icon"/>
            </button>
            <button onClick={(e) => setIncrement(e, -1)} className="increment-decrement decrement">
                <MinusIcon className="icon"/>
            </button>
        </div>
    )
}