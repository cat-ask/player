class PlayList {
    constructor(el, app) {
        this.app = app;
        this.listDom = document.querySelector(el);
        this.itemList = this.listDom.querySelector(".item-list");
        this.itemList.innerHTML = "";
        this.fileList = [];
        this.idx = 0;
        this.playItem = null;
        this.addEvent();
    }

    addEvent() {
        document.querySelector("#openDialog").addEventListener("click", () => {
            document.querySelector("#audioFile").click();
        });
        document.querySelector("#audioFile").addEventListener("change", (e) => {
            let files = e.target.files;
            this.addFileList(files);
            e.target.value = "";
        });

        this.listDom.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        this.listDom.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let files = e.dataTransfer.files;
            this.addFileList(files);
        });
    }

    getNextMusic(loop){

        let current = this.fileList.findIndex(x=> x==this.playItem);//재생중인 인덱스 번호
        
        if(current < this.fileList.length - 1){
            this.playMusic(this.fileList[current + 1]);
        }else if(loop && this.fileList.length != 0){
            this.playMusic(this.fileList[0]);
        }
        this.app.player.audio.pause();
    }

    playMusic(obj){
        this.fileList.forEach(x => {
            x.dom.classList.remove("active");
        });
        obj.dom.classList.add("active");
        this.playItem = obj;
        this.app.player.loadMusic(obj.file);
    }

    addFileList(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.type.substring(0, 5) !== "audio") {
                return;
            }

            let item = document.createElement("li");
            item.classList.add("item");
            item.innerHTML = file.name;

            item.dataset.idx = this.idx;
            let obj = { id: this.idx++, file: file, dom: item };
            this.fileList.push(obj);

            //아이템이 클릭되었을 때 할 작업
            item.addEventListener("dblclick", (e) => {
                this.playMusic(obj);
            });

            item.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.app.openContext(e);
            });


            this.itemList.appendChild(item);
        }
    }

}