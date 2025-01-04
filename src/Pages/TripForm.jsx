import React from "react";
import {Link, useNavigate} from "react-router-dom"
import Incrementer from "../components/incrementer/Incrementer";
import ToFromInputs from "../components/ToFromInputs/ToFromInputs";

export default function(){

    const [travellers, setTravellers] = React.useState(1)
    const [start, setStart] = React.useState("")
    const [destination, setDestination] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")

    const navigate = useNavigate()

    const inputsArray = [
        {
            name: "flying", 
            input1:{
                value: start, 
                onChange:(e) => setStart(e.target.value)
            }, 
            input2: {
                value:destination, 
                onChange:(e) => setDestination(e.target.value)
            }
        },
        {
            name:"date", 
            reverse: true,
            input1:{
                value:startDate, 
                onChange:(e) => setStartDate(e.target.value)
            },
            input2:{
                value:endDate, 
                onChange:(e) => setEndDate(e.target.value)
            },
            type: "date"
        }
    ]

    function test(e){
        e.preventDefault()

        console.log("Hey")

        setTimeout(() => navigate("/your-trip"), 1500)
        
    }

    console.log()

    function changeTravelers(e, amount){
        e.preventDefault()
        setTravellers(oldTravelers => {
            if(amount > 0 || oldTravelers !== 0)
                return oldTravelers + amount
            return oldTravelers
        })
    }

    return (
        <form className="trip-form">
            <label htmlFor="travellers">Number of travellers</label>
            <Incrementer value={travellers} setIncrement={changeTravelers}/>
            
            {inputsArray.map((input, index) => <ToFromInputs key={index} {...input}/>)}

            <button className="submit-button">Plan my Trip!</button>
        </form>
    )
}