import {showPostResult,getData,createDatabase,storeData} from "./App.js";

let postCode=document.getElementById('post_Code')
let postCodeRegex=/^\d{25}$/
let result=null
window.addEventListener('load',()=>{
    getData('json/post.json').then(res=>{
        result=res
    }).catch(err=>{
        console.log(err)
    })
    createDatabase('post')
})
document.getElementById('submit_form').addEventListener('submit',e=>{
    let postCodeValue=postCode.value
    e.preventDefault()
    if(postCodeRegex.test(postCodeValue)){
        let targetPost=result.filter(res=>{
            return res.postCode===postCodeValue
        })
        showPostResult(targetPost)
        storeData('post',targetPost[0])
        postCode.value=''
    }else{
        alert('اطلاعات را صحیح وارد کنید!')
    }

})