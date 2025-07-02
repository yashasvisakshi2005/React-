let select = document.querySelector(".select-heading")
let arrow = document.querySelector(".select-heading img")
let options=document.querySelector(".options")
let option=document.querySelectorAll(".option")
let selecttext =document.querySelector(".select-heading span")


select.addEventListener("click",()=>{
options.classList.toggle("active-options")
arrow.classList.toggle("rotate")
})
option.forEach((item)=>{
    item.addEventListener("click",()=>{
   selecttext.innerText=item.innerText  
     })
})
//chat bot
let prompt =document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area")
let chatContainer = document.querySelector(".chat-container")
let userMessage = "";


 function createChatBox(html,className){
  const div=document.createElement("div")
  div.classList.add(className)
  div.innerHTML=html;
  return div
 }
  








chatbtn.addEventListener("click",()=>{
 userMessage=prompt.value;
//  if(prompt.value=""){
//   chatContainer.style.display="flex"
//  }else{
//   chatContainer.style.display="none"
//  }
//  if(!userMessage)return;
 const html=`<p class="text"></p>`
 let userChatbox=createChatBox(html,"user-chatbox")
 userChatbox.querySelector(".text").innerText=userMessage
 chatContainer.appendChild(userChatbox)
 prompt.value=""
 setTimeout(showLoading(),500)

})