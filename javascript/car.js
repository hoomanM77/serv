import {getData, showCodeResult,idValidation,condition,nationalId,createDatabase,storeData} from "./App.js";

let phoneInput=document.getElementById('phone')
const code1Input=document.getElementById('code1')
const code2Input=document.getElementById('code2')
const iranCode=document.getElementById('iran_code')
const wordCode=document.getElementById('word_code')

let mobileRegex=/^09(9[0-4]|1[0-8]|3[0-9]|2[012])\d{7}$/
let code1=/^\d{3}$/
let code2=/^\d{2}$/
let result=null
let whichIrCode=null
let whichWordCode=null

window.addEventListener('load',()=>{
    getData('json/car.json').then(res=>{
        result=res
    }).catch(err=>{
        console.log(err)
    })
    createDatabase('car')
})
document.querySelectorAll('.ir_code').forEach(li=>{
    li.addEventListener('click',e=>{
        whichIrCode=e.target.dataset.code
        iranCode.innerHTML=e.target.innerHTML
    })
})
document.querySelectorAll('.word_code').forEach(li=>{
    li.addEventListener('click',e=>{
        whichWordCode=e.target.dataset.code
        wordCode.innerHTML=e.target.innerHTML
    })
})
document.getElementById('submit_form').addEventListener('submit',e=>{


    let nationalIdValue=nationalId.value

    if(nationalIdValue.length === 8){
        Number(nationalIdValue.length) ? idValidation(nationalIdValue.padStart(10,'0')) :condition[0]=false
    }else{
        Number(nationalIdValue.length) ? idValidation(nationalIdValue):condition[0]=false
    }

    mobileRegex.test(phoneInput.value)? condition[1]=true : condition[1]=false

    code1.test(code1Input.value)? condition[2]=true : condition[2]=false

    code2.test(code2Input.value)? condition[3]=true : condition[3]=false

    let isRun=condition.every(res=>{
        return res===true
    })
    if(isRun && condition.length>1){
        let userCarIdentification=`${whichIrCode}IR${code1Input.value}${whichWordCode}${code2Input.value}`
        let targetCar=result.filter(item=>{
            return item.code===userCarIdentification
        })
        showCodeResult(targetCar)
        storeData('car',targetCar[0])
        clearInput()
        e.preventDefault()
    }else{
        alert('اطلاعات را صحیح وارد کنید!')
        e.preventDefault()
    }




})

const clearInput = () => {
  nationalId.value=''
  phoneInput.value=''
    code1Input.value=''
    code2Input.value=''
}
