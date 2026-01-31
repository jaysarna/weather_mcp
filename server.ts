import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod"

const server = new McpServer({
    name:"Weather Information",
    version:"1.0"
})

async function getWeatherDataByCity(city:string) {
    if (city.toLowerCase() === 'london'){
        return {temp:"22° C", conditions: "Sunny"}
    }
    if(city.toLowerCase()==='paris'){
        return {temp:"25° C", conditions: "Cloudy"}
    }
    return {temp:null, conditions: "Weater Not found for the city"}
}

server.tool(
    "get_weather",
    "Get the current weather for a city",
    {
        city: z.string().describe("The city to get the weather for") ,
    },
    async ({city}) => {
        const weatherData = await getWeatherDataByCity(city)
        return {
            content:[
                {
                    type:"text",
                    text:JSON.stringify(weatherData)
                
                }
            ]
        }
    }
)

server.resource(
    "weather://cities",
    "List of cities weather available",
    async () => {
        return `Supported Cities 
        - London, 
        - Paris`;
    }
)

async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server connected")
    console.error("Server ready")
}

init().catch(console.error);