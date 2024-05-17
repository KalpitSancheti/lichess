const accounts = ["kalpitdon", "varun05772", "krishankant_2004", "deepanshu202", "surtor15", "homeyprime","Za_Robot10","Dark-knight_1629900","magnusnakamura123456"];
 
const status=[];
var type=0;
 
 
 
 
let isonline=[];
async function onlinestatus() {
    isonline=[];
    const response = await fetch(`https://lichess.org/api/users/status?ids=kalpitdon,varun05772,krishankant_2004,deepanshu202,surtor15,homeyprime,Za_Robot10,Dark-knight_1629900,magnusnakamura123456`);
    const data = await response.json();
 
    for(var i=0;i<accounts.length;i++){
        if(data[i].online==true) isonline.push(true);
        else isonline.push(false);
 
    }
}
 
async function getallstatus(username){
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data;
}
 
 
 
async function addrow(index,nameid,userrating,j,gamestatus){
    //getting table
    const usertable=document.querySelector('#userTable tbody');
    //creating new row
    let newrow=document.createElement('tr');
    newrow.className='rowdata';
    newrow.setAttribute('id', `${nameid}`);
 
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
 
   if(isonline[j]===true){
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
 
const allstatus=[];
async function pushstatus(){
    for(var i=0;i<accounts.length;i++){
        var sta=await getallstatus(accounts[i]);
        allstatus.push(sta);
    }
 
}
 
async function printrating(type) {
    const done=[];
    const ratingsarr=[];
    const sortedratingsarr=[];
    const playingst=[];
    pushstatus();
 
 
 
    const tbody = document.querySelector('#userTable > tbody');
    tbody.innerHTML='';
 
    for (let i = 0; i < accounts.length; i++) {
 
        let rating;
        if(type === 0) { rating = allstatus[i].perfs.rapid.rating; }
        if(type === 1) { rating = allstatus[i].perfs.blitz.rating; }
        if(type === 2) { rating = allstatus[i].perfs.bullet.rating;; }
 
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
 
 
                done.push(accounts[j]);
                var st = allstatus[j].playing;
                addrow(i, accounts[j], ratingsarr[j], j, st);
                break;
            }
        }
    }
}
 
 
 
$(".btn").click(async function(){
 
    var index = $(".btn").index(this);
 
 
    $(".btn").removeClass("active");
 
 
    $(this).addClass("active");
 
    await onlinestatus();
    printrating(index);
  });
  async function main() {
    await pushstatus();
    await onlinestatus(); 
    printrating(1);
}
 
 var resetstatus=async function(){
 
    var onlinedata=await onlinestatus();
 
    for(var i=1;i<=accounts.length;i++){
        const r=document.getElementById(`${accounts[i-1]}`);
        var play=await getallstatus(accounts[i-1]);
        const cell=r.querySelector(".second");
        if(isonline[i-1]){
            cell.style.color="green";
        }
        else{
            cell.style.color="red";
        }
        const playcell=r.querySelector(".fourth");
        playcell.innerHTML="";
        if(play.playing){
            let gl=document.createElement('a');
            gl.href=play.playing;
            gl.innerText="♟️";
            gl.target="_blank";
            playcell.appendChild(gl);
 
 
        }
        else{
            playcell.innerText="🚫";
 
        }
 
 
    }
 
 }

main();
setInterval(function(){
    resetstatus();
 }, 5000);
 
