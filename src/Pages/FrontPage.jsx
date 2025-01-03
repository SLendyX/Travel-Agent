import React from "react";
import cat from "../assets/cat.png"
import { Link } from "react-router-dom";

export default function(){
    return (
        <>
            <img className="logo" src={cat} alt="cat photo"/>
            <Link to="plan-trip">
                <button className="submit-button">Let's Begin</button>
            </Link>
        </>
    )
}