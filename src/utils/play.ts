export const playAudio=(url:string)=>{
    return new Promise((resolve,reject)=>{
        let audio=new Audio();
        audio.src=url;
        audio.play();
        audio.onended=resolve;
        audio.onerror=reject
    })
}