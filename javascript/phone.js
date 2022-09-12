import {showPhoneNumberResult, getData, createDatabase,storeData} from "./App.js";

let postCode=document.getElementById('phone_number')
let phoneNumberRegex=/^0?(99[0-4]|91[1-9]|93[0-9]|90[1-5]|92[012]|941)(\d{7})$/
let result=null
window.addEventListener('load',()=>{
    getData('json/phone.json').then(res=>{
        result=res
    }).catch(err=>{
        console.log(err)
    })
    createDatabase('phone')
})
document.getElementById('submit_form').addEventListener('submit',e=>{
    let phoneNumberValue=postCode.value
    e.preventDefault()
    if(phoneNumberRegex.test(phoneNumberValue)){
        let targetPhoneNumber=result.filter(res=>{
            return res.number===phoneNumberValue
        })
        storeData('phone',targetPhoneNumber[0])
        showPhoneNumberResult(targetPhoneNumber)
        postCode.value=''
    }else{
        alert('اطلاعات را صحیح وارد کنید!')
    }

})