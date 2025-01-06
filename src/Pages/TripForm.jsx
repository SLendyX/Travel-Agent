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
    const [budget, setBudget] = React.useState(0)

    const navigate = useNavigate()
    const stateObject = {travellers, start, destination, startDate, endDate, budget}

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

        navigate("/your-trip", {state: stateObject})
        
    }

    function changeBudget(e){
        const value = e.target.value.split("$ ")[1]
        if(!(value < 0 || value.split('').some(char => (char < '0' || char > '9'))))
            setBudget(value > 0 ? `${Number(value)}` : value)
    }

    function changeTravelers(e, amount){
        e.preventDefault()
        setTravellers(oldTravelers => {
            if(amount > 0 || oldTravelers !== 0)
                return oldTravelers + amount
            return oldTravelers
        })
    }

    function placeCursorToEnd(e){
        const {length} = e.target.value
        e.target.setSelectionRange(length, length)
    }

    return (
        <form className="trip-form" onSubmit={test}>
            <label htmlFor="travellers">Number of travellers</label>
            <Incrementer value={travellers} setIncrement={changeTravelers}/>
            
            {inputsArray.map((input, index) => <ToFromInputs key={index} {...input}/>)}

            <label htmlFor="budget">Budget</label>
            <input 
                id="budget" 
                value={"$ "+ budget} 
                onChange={changeBudget} 
                name="budget" 
                onClick={placeCursorToEnd}
                onFocus={placeCursorToEnd}
            />

            <button className="submit-button">Plan my Trip!</button>
        </form>
    )
}