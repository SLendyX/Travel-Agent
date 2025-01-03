import React from "react";
import {Link, useNavigate} from "react-router-dom"


export default function(){

    const navigate = useNavigate()

    function test(e){
        e.preventDefault()

        console.log("Hey")

        setTimeout(() => navigate("/your-trip"), 1500)
        
    }

    return (
        <form>
            <input type="number"/>
            <button>Plan my Trip!</button>
        </form>
    )
}