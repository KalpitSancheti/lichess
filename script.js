const accounts = ["kalpitdon", "varun05772", "krishankant_2004", "deepanshu202", "surtor15", "homeyprime","Za_Robot10","Dark-knight_1629900","magnusnakamura123456"];
    
const status=[];
var type=0;




async function getblitzrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.blitz.rating;
}
async function getbulletrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.bullet.rating;
}
async function getrapidrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.rapid.rating;
}
async function onlinestatus(username) {
    const response = await fetch(`https://lichess.org/api/users/status?ids=${username}`);
    const data = await response.json();
   
    const us = data[0].online;
    return us ? us : false;
}
async function getplayingstatus(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.playing;
}



async function addrow(index,nameid,userrating,j,gamestatus){
    //getting table
    const usertable=document.querySelector('#userTable tbody');
    //creating new row
    let newrow=document.createElement('tr');
    newrow.className='rowdata';
    
    //serial number

    let serial=document.createElement('td');
    serial.innerText=index+1;
    serial.className="first";
    newrow.appendChild(serial);

    // second cell
    let second=document.createElement('td');
    second.className="second"
    let celllink=document.createElement('a');
    celllink.href=`https://lichess.org/@/${nameid}`;
    celllink.textContent=nameid;
    second.appendChild(celllink);
   
   if(status[j]===true){
    second.style.color="green";
   }
    
    
    newrow.appendChild(second);
    
    //third cell
    let third=document.createElement('td');
    third.className="third";
    third.innerText=userrating;
    newrow.appendChild(third);
    usertable.append(newrow);
    // fourth cell
    let fourth=document.createElement('td');
    fourth.className="fourth";
    if(gamestatus){
        let gl=document.createElement('a');
        gl.href=gamestatus;
        gl.innerText="♟️";
        gl.target="_blank";
        fourth.appendChild(gl);
        
    }
    else{
        fourth.innerText="🚫"
    }
    
   
    newrow.appendChild(fourth);
    usertable.append(newrow);



}
// (async function() {
//     for(var i=0;i<accounts.length;i++){
//         const onstatus=await onlinestatus(accounts[i]);
      
//         status.push(onstatus);
//     }
    
// })();


async function printrating(type) {
    const done=[];
    const ratingsarr=[];
    const sortedratingsarr=[];
    const playingst=[];

    const tbody = document.querySelector('#userTable > tbody');
    tbody.innerHTML='';

    for (let i = 0; i < accounts.length; i++) {
        let rating;
        if(type === 0) { rating = await getrapidrating(accounts[i]); }
        if(type === 1) { rating = await getblitzrating(accounts[i]); }
        if(type === 2) { rating = await getbulletrating(accounts[i]); }
       
        ratingsarr.push(rating);
        sortedratingsarr.push(rating);
    }
    sortedratingsarr.sort((a, b) => b - a);
  
    var ind=0;
    for(let i=0;i<accounts.length;i++){
        for(let j=0;j<accounts.length;j++){
            if(ratingsarr[j] === sortedratingsarr[i]){
                var f=0;
                for(var k=0;k<done.length;k++){
                    if(done[k] === accounts[j]){
                        f=1;
                        break;
                    }
                }
                if(f === 1){
                    continue;
                }
                const onstatus = await onlinestatus(accounts[j]); 
                status[j] = onstatus;
                done.push(accounts[j]);
                var st = await getplayingstatus(accounts[j]);
                addrow(i, accounts[j], ratingsarr[j], j, st);
                break;
            }
        }
    }
}



$(".btn").click(function(){
    
    var index = $(".btn").index(this);
    
    
    $(".btn").removeClass("active");
  
    
    $(this).addClass("active");
  
    
    printrating(index);
  });
  printrating(2);

