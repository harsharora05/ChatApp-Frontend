





type dataT = {
    "type": string,
    "payload": {
        "roomId"?: string
        "message"?: string
    }
}




export const joinRoom = (data: dataT) => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onerror = console.error;

    ws.onopen = () => {
        const newMessage = JSON.stringify(data);
        ws.send(newMessage);
    };

    ws.onmessage = (e) => {
        console.log(e.data);
    }

}

