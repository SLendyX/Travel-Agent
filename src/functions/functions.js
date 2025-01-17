export async function getWeather({location}){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.weather}`
        const response = await fetch(url)
        const data = await response.json()

        return JSON.stringify(data)
    }catch (err){
        console.log(err)
    }
}

export const tools = [
    {
        type: "function",
        function: {
            name: "getWeather",
            description: "Get current temperature for a given location.",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The name of the city e.g. London, Stuttgard"
                    }
                },
                required: ["location"]
            }
        }
    },
]