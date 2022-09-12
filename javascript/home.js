import {idValidation, nationalId, condition, getData, showHomeResult, createDatabase, storeData} from "./App.js";
let zipCodeRegex=/^\d{10}$/
let dateRegex=/^(12|13|14)(\d{2})\/(1[012]|0[1-9]|[1-9])\/(3[01]|2[0-9]|1[0-9]|[1-9]|0[1-9])$/
let zipCodeInput=document.getElementById('zip_code')
let dateInput=document.getElementById('date')
let result=null
window.addEventListener('load',e=>{
    getData('json/home.json').then(res=>{
        result=res
    }).catch(err=>{
        console.log(err)
    })
    createDatabase('home')
})


document.getElementById('submit_form').addEventListener('submit',e=>{
    let nationalIdValue=nationalId.value
    e.preventDefault()
    if(nationalIdValue.length === 8){
        Number(nationalIdValue.length) ? idValidation(nationalIdValue.padStart(10,'0')) :condition[0]=false
    }else{
        Number(nationalIdValue.length) ? idValidation(nationalIdValue):condition[0]=false
    }

    zipCodeRegex.test(zipCodeInput.value)? condition[1]=true:condition[1]=false

    dateRegex.test(dateInput.value)? condition[2]=true:condition[2]=false


    let isRun=condition.every(res=>{
        return res===true
    })
    if(isRun && condition.length>0){
        let targetHome=result.filter(res=>{
            return res.zipCode===zipCodeInput.value
        })
        showHomeResult(targetHome)
        storeData('home',targetHome[0])
        clearInput()
    }else{
        alert('اطلاعات را صحیح وارد کنید!')
    }






})
const clearInput = () => {
    nationalId.value=''
    zipCodeInput.value=''
    dateInput.value=''
}