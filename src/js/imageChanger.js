let myImage = document.querySelector('img');

myImage.onclick = function(){
    let mySrc = myImage.getAttribute('src');
    if(mySrc === "../src/images/SteamRating_Data_Art.png"){
        myImage.setAttribute('src', "../src/images/Savings_Data_Art.png")
    } else 
    {
        myImage.setAttribute('src', "../src/images/SteamRating_Data_Art.png")
    }
}