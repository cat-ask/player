Number.prototype.timeFormat = function () {
    let h = "0" + Math.floor(this / 3600);
    h = h.substring(h.length - 2, h.length);
    let m = "0" + Math.floor(this % 3600 / 60);
    m = m.substring(m.length - 2, m.length);
    let s = "0" + Math.floor(this % 60);
    s = s.substring(s.length - 2, s.length);
    return `${h}:${m}:${s}`;
}


class App {
    constructor(playerEl, listEl) {
        this.player = new Player(playerEl, this);
        this.list = new PlayList(listEl, this);
        this.contextItem = null;
        this.contextMenu = document.querySelector("#contextMenu");
        
        this.addEvent();
    }

    addEvent(){
        document.addEventListener("click", (e)=>{
            if(this.contextItem != null){
                this.closeContext();
            }
        });

        document.querySelector("#del").addEventListener("click", ()=>{
            if(this.contextItem == null) return;

            const l = this.list.fileList;
            let idx = l.findIndex( x => x.dom == this.contextItem);
            let removedItem = l.splice(idx, 1);
            if(removedItem[0] == this.list.playItem){ //재생중인 애가 삭제되버린 거.                
                this.list.getNextMusic(this.player.repeatMode == REPEATMODE.LIST);
            }
            this.contextItem.remove();
        });
    }

    openContext(e) {
        this.contextItem = e.target;
        this.contextMenu.classList.add("on");
        setTimeout(() => {
            this.contextMenu.classList.add("visible");
            this.contextMenu.style.left = e.clientX + "px";
            this.contextMenu.style.top = e.clientY + "px";
        }, 10);
    }
    closeContext() {
        this.contextItem = null;
        this.contextMenu.classList.remove("visible");
        setTimeout(()=>{
            this.contextMenu.classList.remove("on");
        }, 400);
    }
}

window.addEventListener("load", () => {
    let app = new App("#player", "#playList");
});