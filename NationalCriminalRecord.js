async function fetching(){
    let IdNumber=document.getElementById("UserIdNumber").value.toLowerCase()
    document.getElementById("searching_record").style.display="block"
    document.getElementById("user_image").style.display="none"

    if(IdNumber===""){
        document.getElementById("searching_record").style.display="none"
        alert("Please type details")
        return
    }   
    try{
        let response= await fetch("https://api.jsonbin.io/v3/qs/6a21430ada38895dfe857938")
        console.log("response Testing",response)
        if(!response.ok){
            throw new Error("server Not Responding, Try Again later1")
        }
        let data=await response.json()
        console.log("data printing........",data)
        
        if(data.record[IdNumber]){
            // Clear any previous error messages and show the image container
            document.getElementById("form_input_error").innerHTML=""
            document.getElementById("user_image").style.display="block"

            let userName=data.record[IdNumber].name
            console.log("user Name ----",userName)
            document.getElementById("form_input-First").innerText=userName.toUpperCase()
            
            // Fixed: changed .Last to .last to match your JSON data format
            let userLast=data.record[IdNumber].last 
            document.getElementById("form_input-last").innerText=userLast.toUpperCase()

            let UserPhoto=data.record[IdNumber].image
            let currentStatus=data.record[IdNumber].status

            // Default: Base profile image without any stamp
            document.getElementById("user_image").innerHTML=`<img id="user_image_tag" src="${UserPhoto}" width="200px" alt="User Image">`
            
            // Checking statuses to apply the correct stamp overlay
            if(currentStatus==="Suspected")
            {
                document.getElementById("user_image").innerHTML=`<div id="user_image">
                <img id="user_image_Tag" src="${UserPhoto}" width="200px" alt="User Image" />
                <img id="user_image_Tag_02" src="stamp.png" style="opacity:0.6;"/>
                </div>`
            }
            else if(currentStatus==="Arrested")
            {
                document.getElementById("user_image").innerHTML=`<div id="user_image">
                <img id="user_image_Tag" src="${UserPhoto}" width="200px" alt="User Image" />
                <img id="user_image_Tag_02" src="arrest.png" style="opacity:0.6;"/>
                </div>`
            }
            else if(currentStatus==="Executed")
            {
                document.getElementById("user_image").innerHTML=`<div id="user_image">
                <img id="user_image_Tag" src="${UserPhoto}" width="200px" alt="User Image" />
                <img id="user_image_Tag_02" src="execute.png" style="opacity:0.6;"/>
                </div>`
            }
        }
        else{
            document.getElementById("form_input_error").innerHTML="Required details not founnd"
            document.getElementById("form_input-First").innerHTML=""
            document.getElementById("form_input-last").innerHTML=""
        }
    }
   catch(error){
    document.getElementById("form_input_error"). innerText=error}
finally{
document.getElementById("searching_record").style.display="none"}
}

