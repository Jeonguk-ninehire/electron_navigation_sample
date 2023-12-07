const { ipcRenderer } = require('electron')

window.onload = () => {
    console.log('onload');
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");

    let webContentsId = -1;
    ipcRenderer.on("sendId", (e, id) => {
        console.log('Renderer: sendId: $s', id);
        webContentsId = id;
    });

    ipcRenderer.on("canNav", (e, canBack, canForward) => {
        console.log('Renderer: canNav');
        backButton.disabled = !canBack;
        forwardButton.disabled = !canForward;
    });

    backButton.onclick = () => {
        console.log('Renderer: goBack');
        ipcRenderer.send("goBack", webContentsId);
    };

    forwardButton.onclick = () => {
        console.log('Renderer: goForward');
        ipcRenderer.send("goForward", webContentsId);
    };
}

