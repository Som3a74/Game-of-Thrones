let d_info = document.getElementsByClassName('divAllInfo')[0];
let table_body = document.getElementById('table_body');


//loading screen
let loading = document.getElementsByClassName('loading')[0]


//button next and back
let next = document.getElementById('next');
let back = document.getElementById('back');


// value of first and last item in table
let numi = document.getElementById('numi');
let numc = document.getElementById('numc');
let numall = document.getElementById('numall');

// array counter of next and back
let arrCount = [[0,10],[10,20],[20,30],[30,40],[40,50],[50,53]]


/////get Api
async function getApi() {
    loading_screen()
    let freq = await fetch(`https://thronesapi.com/api/v2/Characters`)
    let req = await freq.json()

    if (freq.status == 200) {
        loading_screen()
        console.log(req);
        nextBack(req)
        display_character(req)
        numall.innerHTML=`  of ${req.length}`
    }
}
getApi()



//display table
async function display_table(req , numcount ,icount) {
    numi.innerHTML=`${icount+1}`
    numc.innerHTML=`${numcount}`
    for (let i = icount  ; i < numcount ; i++) {
        table_body.innerHTML += `
        <tr id='${req[i].id}'>
            <td class="text-center" scope="row">${(req[i].id)+1 }</td>
            <td class="text-center">${req[i].fullName}</td>
            <td class="text-center"><img src=${req[i].imageUrl} alt=""></td>
        </tr>`
    }

    let tr = document.querySelectorAll('tr')
    for(let i = 0; i < tr.length; i++){
        tr[i].addEventListener('click',function () {
            display_character(req,tr[i].id)
        })
    }
}



// next and back button
function nextBack(req) {

    let i = 0;
    icount=0;
    numcount=10;
    display_table(req , numcount ,icount)
    next.addEventListener('click',function () {
        i++

        if (i <= 5) {
            table_body.innerHTML = ` `
            icount=arrCount[i][0]
            numcount = arrCount[i][1]
            
            display_table(req , numcount ,icount)
            // console.log(`////////////next////////////////`);
            // console.log(`numcount :` + numcount);
            // console.log(`icount :` + numcount);
            // console.log(`i : `+i);
            // console.log(`//////////////////////////////`);
            back.disabled = false;

        } else {
            next.disabled = true;
        }
    })
    back.addEventListener('click',function () {
        i--
        if (i >= 0) {
            table_body.innerHTML = ` `
            icount=arrCount[i][0]
            numcount = arrCount[i][1]
            
            display_table(req , numcount ,icount)
            // console.log(`////////////back///////////////`);
            // console.log(`numcount :` + numcount);
            // console.log(`icount :` + numcount);
            // console.log(`i : `+i);
            // console.log(`//////////////////////////////`);
            next.disabled = false;
        } else {
            back.disabled = true;
        }
    })
}



// display caracter information
async function display_character(req , getid) {
    d_info.innerHTML = `
    <div class="w-100 text-center p-2 mb-3">
        <img class="rounded img_info" src=${req[getid||0].imageUrl} alt="">
    </div>
    <div class="w-100 px-2">
        <div class="d-flex d_info">
            <p>First Name  </p>
            <span> :   ${req[getid || 0].firstName}  </span>
        </div>
        <div class="d-flex d_info">
            <p>Last Name  </p>
            <span> :   ${req[getid || 0].lastName}   </span>
        </div>
        <div class="d-flex d_info">
            <p>Full Name </p>
            <span> :   ${req[getid || 0].fullName}  </span>
        </div>
        <div class="d-flex d_info">
            <p>Title </p>
            <span> :   ${req[getid || 0].title}  </span>
        </div>
        <div class="d-flex d_info">
            <p>Family  </p>
            <span> :   ${req[getid || 0].family}   </span>
        </div>
    </div>`
}



//loading screen
function loading_screen() {
    if (loading.classList.contains('d-none') == true) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}