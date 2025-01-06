import React from "react";
import { OpenaiObject, getOpenai} from 'openai-proxy'
import { useLocation, useSearchParams } from "react-router";

export default function(){
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    
    for(const entry of searchParams.entries())
        console.log(entry)



    React.useEffect(() => {
        if(location?.state)
            setSearchParams(location.state)
    }, [])

    return (
        <>
        </>
    )
}