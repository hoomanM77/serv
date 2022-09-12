////////////////////Variables//////////////////////////////////////
const $=document
let condition=[]
let nationalId=document.querySelector('#national_id')
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
///////////////////////////////////////////////////////
const getData = async (fileName) => {
  let res=await fetch(fileName)
    if(res.ok){
        return await res.json()
    }else{
        throw Error(`${res.status}`)
    }
}
const idValidation = (val) => {
    let count=10
    let sum=0
    for (const valElement of val.slice(0,val.length-1)) {
        sum+=valElement*count
        count--
    }
    let r=sum%11
    if(r<2 && Number(val.slice(-1))===r){
        condition[0]=true
    }else if(Number(val.slice(-1))=== 11- r){
        condition[0]=true
    }else{
        condition[0]=false
        alert('کد ملی شما معتبر نیست!')
    }
}
const showCodeResult = targetCar => {
    let allCars=targetCar.map(car=>{
        return `<tr><td>${car.nationalId}</td><td>${car.code}</td><td>${car.Owner}</td><td>${car.pay}تومان </td></tr>`
    }).join('')
    document.getElementById('user_container').insertAdjacentHTML('beforeend',allCars)
}
const showHomeResult = targetHome => {
    let allHomes=targetHome.map(home=>{
        return `<tr><td>${home.nationalId}</td><td>${home.zipCode}</td><td>${home.name}</td><td>${home.createdDate} </td> <td>${home.address}</td></tr>`
    }).join('')
    document.getElementById('user_container').insertAdjacentHTML('beforeend',allHomes)
}

const showPostResult = targetPost => {
    let allPost=targetPost.map(post=>{
        return `<tr><td>${post.postCode}</td><td>${post.name}</td><td>${post.nationalId}</td><td>${post.include} </td> <td>${post.arivalTime}</td></tr>`
    }).join('')
    document.getElementById('user_container').insertAdjacentHTML('beforeend',allPost)
}
const showPhoneNumberResult = targetPhoneNumber => {
    let allPhoneNumber=targetPhoneNumber.map(phone=>{
        return `<tr><td>${phone.number}</td><td>${phone.name}</td><td>${phone.nationalId}</td><td>${phone.operator}</td></tr>`
    }).join('')
    document.getElementById('user_container').insertAdjacentHTML('beforeend',allPhoneNumber )
}
let database,dbInfo,transaction,saveDatabase,req=null

function createDatabase(databaseName) {
    database=indexedDB.open(databaseName,15)
    database.addEventListener('error',e=>{
        console.log('database create error',e)
    })
    database.addEventListener('success',e=>{
        dbInfo=e.target.result
        restoreData(databaseName)
        console.log('database create success',e)
    })
    database.addEventListener('upgradeneeded',e=>{
        dbInfo=e.target.result
        if(!dbInfo.objectStoreNames.contains(databaseName)){
            dbInfo.createObjectStore(databaseName,{
                keyPath:'id'
            })
        }

        // if(dbInfo.objectStoreNames.contains(databaseName)){
        //     dbInfo.deleteObjectStore(databaseName)
        // }

        console.log('database upgrade',e)

    })
}
const storeData = (databaseName,targetData) => {
  transaction=dbInfo.transaction(databaseName,"readwrite")
  transaction.addEventListener('error',e=>{
        console.log('transaction error',e)
  })
  transaction.addEventListener('complete',e=>{
        console.log('transaction success',e)
  })
  saveDatabase=transaction.objectStore(databaseName)

  req=saveDatabase.add(targetData)

  req.addEventListener('error',e=>{
        console.log('req error',e)
  })
    req.addEventListener('success',e=>{
        console.log('req success',e)
  })
}
const restoreData = databaseName => {
    transaction=dbInfo.transaction(databaseName,"readwrite")
    transaction.addEventListener('error',e=>{
        console.log('transaction error',e)
    })
    transaction.addEventListener('complete',e=>{
        console.log('transaction success',e)
    })
    saveDatabase=transaction.objectStore(databaseName)

    req=saveDatabase.getAll()

    req.addEventListener('error',e=>{
        console.log('req error',e)
    })
    req.addEventListener('success',e=>{
        switch (databaseName) {
            case 'car': {
                showCodeResult(e.target.result)
            }
            break
            case 'home':{
                showHomeResult(e.target.result)
            }
            break
            case 'post':{
                showPostResult(e.target.result)
            }
            break
            case 'phone':{
                showPhoneNumberResult(e.target.result)
            }
            break
        }
        console.log('req success',e)
    })

}







export {getData,showCodeResult,idValidation,condition,nationalId,showHomeResult,showPostResult,showPhoneNumberResult,createDatabase,storeData}