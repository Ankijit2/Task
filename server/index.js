import {app} from "./app.js"
import ConnectDB from "./database/dbconnect.js"
import 'dotenv/config'

const PORT = process.env.PORT || 4000;


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
