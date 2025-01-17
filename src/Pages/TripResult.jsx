import React from "react";
import { OpenaiObject, getOpenai} from 'openai-proxy'
import { useLocation, useSearchParams } from "react-router";
import { tools, getWeather } from "../functions/functions";
import { Link } from "react-router-dom";

export default function(){
    const func = {getWeather}

    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    
    const [weather, setWeather] = React.useState("")
    const [flights, setFlights] = React.useState("")
    const [hotels, setHotels] = React.useState("")

    React.useEffect(() => {
        if(location?.state)
            setSearchParams(location.state)
    }, [])

    React.useEffect(() => {
        async function fetchData() {
            const messages = [
                {
                    role: "system",
                    content: `You are a helpful AI agent. Give highly specific answers based on the information you're provided. Give concise answers, no longer than 100 characters. Prefer to gather information with the tools provided to you rather than giving basic, generic answers.
                    If any the tools can't provide the necessary information then you can use the generic information you have at your disposal, but please be specific and give options (e.g. hotels Intercontinetal, flight company Wizz Air, etc.). As a last measure you can make things up, but only if you have no other choice.
                    You are going to separate the answer into 3 sections: Weather, Flights and Hotel. And please be consistent. Write them like the following example:
                    ###Weather
                    In london it's warm with some clouds in the sky
                    ###Fligts
                    Flying is often cheap in this part of the country
                    ###Hotels
                    While there aren't any hotels nearby there some beautiful cabins for rent`
                },
                {
                    role: "user",
                    content: `I am planning to leave to ${searchParams.get("destination")} on ${searchParams.get("startDate")} and come back to ${searchParams.get("start")} on ${searchParams.get("endDate")}. We are ${searchParams.get("travellers")} travellers and have a budget of ${searchParams.get("budget")} dollars.`
                }
            ]
    
            for(let i = 0; i<10; i++){
                const response = await getOpenai(new OpenaiObject(
                    "chat.completions.create", "gpt-4o-mini", 
                    {
                        messages,
                        tools
                    }
                ))

                const {finish_reason: finishReason, message} = response.choices[0]
                const {tool_calls: toolCalls} = response.choices[0].message

                messages.push(message)

                if(finishReason==="stop"){
                    const reg = /\n?### ?\w+\n/i
                    const contentArray = message.content.split(reg).slice(1)

                    setWeather(contentArray[0])
                    setFlights(contentArray[1])
                    setHotels(contentArray[2])
                    break;
                }else if(finishReason === "tool_calls"){

                    for(const {function: tool, id} of toolCalls){
                        const functionCall = await func[tool.name](JSON.parse(tool.arguments))
                    
                        messages.push(
                        {
                            role: "tool",
                            tool_call_id: id,
                            content: functionCall
                        })
                    
                    }


                }
        

            }
        }

        fetchData()

    }, [searchParams])


    return (
        <>
            <Link to="../" className="go-back">Go back</Link>

            <h1>Your Trip</h1>

            <div className="date-container">
                <div className="output-container date">
                    <p>
                        → {searchParams.get("startDate")}&nbsp;&nbsp;
                    </p>
                    </div>
                <div className="output-container date">
                    <p>
                    &nbsp;&nbsp;{searchParams.get("endDate")} ←
                    </p>
                </div>
            </div>

            <div className="output-container">
                <h3>
                    {searchParams.get("start")} → {searchParams.get("destination")}
                </h3>
            </div>

            <div className="info-containers">
                <h2>Weather</h2>
                <div className="output-container">
                    <p>
                        {weather || "Loading..."}
                    </p>
                </div>
            </div>
            
            <div className="info-containers">
            <h2>Flights</h2>
                <div className="output-container">
                    <p>
                        {flights || "Loading..."}
                    </p>
                    <button className="submit-button">Book</button>
                </div>
            </div>

            <div className="info-containers">
            <h2>Hotel</h2>
                <div className="output-container">
                    <p>
                        {hotels || "Loading..."}
                    </p>
                    <button className="submit-button">Book</button>
                </div>
            </div>

            
        </>
    )
}