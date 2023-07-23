export default class WebSocketClient {
    constructor(url) {
      this.url = url;
      this.client = new WebSocket(this.url);
      this.client.onmessage = this.onMessage;
      this.client.onerror = (err) =>
        console.log('Error while connecting to the server: ' + err);
  
      console.log('WebSocketClient initialized!');
    }
  
    send(message) {
      
      if (this.client && this.client.readyState === this.client.OPEN)
        this.client.send(JSON.stringify(message));
      else console.log('Could not send message: ', message);
    }
  
    onMessage = (message) => {
      const messagePayload = JSON.parse(message.data);
      console.log('this.onReceiveMessage: ', this.onReceiveMessage);
  
      if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
    };
  
    close = () => {
      this.client.close();
    };
  }

// 배포용 url
// const realUrl = "3.37.211.126";
// // test용 url
// const testUrl = "192.168.105.27";
// const testUrl2 = "192.168.219.142";

// const client = new WebSocketClient("ws://" + realUrl + ":8080/chat/1");

// export default client;