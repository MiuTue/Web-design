let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbsSpeed = document.getElementById("kbs"),
    mbsSpedd = document.getElementById("mbs"),
    Info = document.getElementById("info");

let totalBitsSpeed = 0;
let totalKbsSpeed = 0;
let totalMbsSpeed = 0;
let numTests = 1;
let testCompleted = 0;

//Get random image from unplash.com
let imageAPI = "https://source.unsplash.com/random?topic=nature";

//When image loads
image.onload =async function(){
    endTime = new Date().getTime();

    //Get image size
    await fetch(imageAPI).then((response) =>{
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    })
}


//function to calculate speed 
function calculateSpeed(){
    //Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    //Total bits
    let loadedBits = imageSize * 8;
    let speedinBits = loadedBits /  timeDuration;
    let speedinKbs = speedinBits / 1024;
    let speedinMbs = speedinKbs / 1024;

    totalBitsSpeed += speedinBits;
    totalKbsSpeed += speedinKbs;
    totalMbsSpeed += speedinMbs;

    testCompleted++;
    //If all tests completed (we get 5 image then calculate average)
    if (testCompleted == numTests){
        let averageSpeedInBits = (totalBitsSpeed/numTests).toFixed(2);
        let averageSpeedInKBS = (totalKbsSpeed/numTests).toFixed(2);
        let averageSpeedInMbs = (totalMbsSpeed/numTests).toFixed(2);

        //Display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBits} bit/s`;
        kbsSpeed.innerHTML += `${averageSpeedInKBS} kb/s`;
        mbsSpedd.innerHTML += `${averageSpeedInMbs} mb/s`;
    } else{
        //Run the nex test
        startTime = new Date().getTime();
        image.src = imageAPI;
        
    }
}


//Initial function to start tests
const init = async() =>{
    Info.innerHTML = "Testing ...";
    startTime = new Date().getTime();
    image.src = imageAPI;
}

//Run test when window loads
window.onload = () =>{
    for (let i = 0; i < numTests; i++){
        init();
    }
};
