const express=require("express")
const app=express()
app.use(express.static("src"))
const {exec }=require("child_process")
app.post("/doichecking",(req,res)=>{
    const data =req.body
    console.log(data)
    res.send("Thanks for subscribing")
})
app.get("/doichecking",(req,res)=>{
    const data =req.body 
    console.log(data)
    res.send("Thanks for subscribing")
})
async function  netStats(remote,port){
    console.log(remote)
    if (remote==1)
        remote="localhost"
    return new Promise((resolve, reject) => {
        exec(`netstat --tcp | grep ${remote}:${port}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                resolve("")
                return;
            }
            if (stderr) {
                
                console.log(`stderr: ${stderr}`);
                reject(stderr)
                return;
            }
            // console.log(`stdout: ${stdout}`);
            resolve(stdout)

        });
    })
}
app.post("/wait",(req,res)=>{
    let { remoteAddress, remotePort, localAddress, localPort }=req.socket
    console.log(`Remote IP: ${remoteAddress}, Remote Port: ${remotePort}`);
    console.log(`Local IP: ${localAddress}, Local Port: ${localPort}`);
    console.log("waitind start")
    setTimeout(async () => {
        try{
            console.log("waiting completed",req.socket)
            remoteAddress=remoteAddress.split(":")
            console.log(remoteAddress,remotePort)
            remoteAddress=remoteAddress[remoteAddress.length-1]
            let tcpConne=await netStats(remoteAddress,remotePort)
            if (tcpConne){
                tcpConne=tcpConne.split("\n")
                if (tcpConne.length){
                    console.log("Correct")
                }
                else{
                    console.log("Incorrect")
                }
            }
            else{
                console.log("Incorrect")
            }
            console.log(tcpConne)
        }catch(err){
            console.log(err.message)
        }
        
        res.send("COmpleted")
    }, `35000`);
})
PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log("App  is listening on ",PORT)
})
