class Player{
    constructor(el,app){
        this.app = app;
        this.playerDom = document.querySelector(el);
        this.audio = this.playerDom.querySelector("audio");
        this.pBar = this.playerDom.querySelector(".bar");
        this.cTime = this.playerDom.querySelector(".curret-time");
        this.dTime = this.playerDom.querySelector(".total-time");
        this.filename = this.playerDom.querySelector(".file-name");
        this.filename.innerHTML="선택한 파일이 없습니다.";
        this.playable=false;
        this.progress = this.playerDom.querySelector(".progress");
        this.playbtn = this.playerDom.querySelector("#play_btn");
        this.addEvent();
        requestAnimationFrame(()=>{
            this.frame();
        });
    }

    addEvent(){
        document.querySelector("#play_btn").addEventListener("click",()=>{
            this.play();
        });
        document.querySelector("#stop_btn").addEventListener("click",()=>{
            this.stop();
        });
        this.audio.addEventListener("loadeddata",()=>{
            this.playable=true;
            this.audio.play();
        });

        this.progress.addEventListener("click",(e)=>{
            this.changeSeeking(e);
        });
    }

    play(){
        if(!this.playable) return;
        if(this.audio.paused){
            this.audio.play();
            this.playbtn.innerHTML="일시정지";
        }else{
            this.audio.pause();
            this.playbtn.innerHTML="재생";
        }
        
    }

    stop(){
        this.audio.pause();
    }

    frame(timestamp){
        requestAnimationFrame(()=>{
            this.frame();
        });
        this.render();
    }

    render(){
        if(!this.playable) return;
        let c = this.audio.currentTime;
        let d = this.audio.duration;
        this.pBar.style.width = `${c/d * 100}%`;
        this.cTime.innerHTML = c.timeFormat();
        this.dTime.innerHTML = d.timeFormat();
    }

    loadMusic(file){
        let fileURL=URL.createObjectURL(file);
        this.audio.src = fileURL;
        this.filename.innerHTML = file.name;
        this.play();
    }

    changeSeeking(e){
        if(!this.playable) return;
        let seek = e.offsetX / this.progress.clientWidth * this.audio.duration;
        this.audio.currentTime = seek;
    }
}