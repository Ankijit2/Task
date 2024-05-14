import express from "express"
import { corsOptions } from "./utils/config.js"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))



import dataroute from "./routes/dataroute.js"

app.use("/api",dataroute)


export {app}