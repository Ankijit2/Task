import {app} from "./app.js"
import ConnectDB from "./database/dbconnect.js"
import 'dotenv/config'
import { Data } from "./models/Companydatamodel.js";
const PORT = process.env.PORT || 5000;



ConnectDB()
.then(()=>{
    
    app.listen(PORT || 8000, ()=>{
    console.log(`Server is running on port ${PORT}`);
    })
}).catch((err)=>{
    console.log("MongoDB connection error : ",err)
})

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
