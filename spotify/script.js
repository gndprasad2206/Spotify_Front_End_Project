console.log("Welcome to spotify");
//Initialize the variable 
let index;
let audioElement=new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let masterSongName = document.getElementById('masterSongName');

let songs=[
    {songName: "Ee ManaSe Se Se", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cheliya Cheliya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Emi Sodara", filePath: "songs/3.mp3", coverPath: "covers/1.jpg"},
    {songName: "Premante", filePath: "songs/4.mp3", coverPath: "covers/2.jpg"},
    {songName: "Ye Mera Jaha", filePath: "songs/5.mp3", coverPath: "covers/2.jpg"},
    {songName: "Yemaindo Yemo", filePath: "songs/6.mp3", coverPath: "covers/1.jpg"},
]   

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0 ){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen To Events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        index = parseInt(e.target.id);
        console.log(index);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        audioElement.src = 'songs/'+(index)+'.mp3';
        masterSongName.innerText = songs[index-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(index<6){
        index+=1;
    }else{
        index=0;
    }
    audioElement.src = 'songs/'+(index)+'.mp3';
    masterSongName.innerText = songs[index-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(index>0){
        index-=1;
    }else{
        index=0;
    }
    audioElement.src = 'songs/'+(index)+'.mp3';
    masterSongName.innerText = songs[index-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})