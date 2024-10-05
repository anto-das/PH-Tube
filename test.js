// function getTimeString(time){
//     // get hour and rest seconds
//     const hour =parseInt(time/3600);
//     let remingSecond =time % 3600;
//     const minute =parseInt(remingSecond/60);
//     remingSecond = remingSecond %60;
//     return `${hour} hours ${minute}minute ${remingSecond} seconds`
// }
// console.log(getTimeString(7865))



function getSort(value){
    let removeK =value.split('k');
    let strToNum =parseInt(removeK[0]);
    console.log(strToNum)
}

const value=getSort('234k');