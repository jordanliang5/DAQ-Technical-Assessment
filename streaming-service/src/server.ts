import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';

const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

// Temp counts and interval start time initially zero
var setNewInterval = false;
var exceededTempCount = 0;
var intervalStart = 0;

// Initialise log file (create if doesn't exist)
var fs = require('fs')
var error_logger = fs.createWriteStream('incidents.log', {
    flags: 'a+'
})

export function checkValueInRange(temp: number, currTime: number): void {
    // Check if still within 5 seconds
    if (((currTime - intervalStart)/1000) > 5 ) {
        setNewInterval = true;
    } 
    if (setNewInterval) {
        intervalStart = currTime;
        exceededTempCount = 0;
        setNewInterval = false;
    }
    // Increment count if temperature unsafe
    if (temp < 20 || temp > 80) {
        exceededTempCount++;
    }
    // Check if exceeds 3 failures
    if (exceededTempCount > 3) {
        var date = Date();   
        // Within 5 seconds, write log entry
        console.log('Exceeded range more than 3 times in 5 seconds! Writing to report...');
        error_logger.write(`${date}: Exceeded temperature range more than 3 times in 5 seconds!` + '\r\n');
        setNewInterval = true;
    }       
}

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');
    socket.on('data', (msg) => {
        console.log(msg.toString());
        try {
            let currJSON = JSON.parse(msg.toString());
            let temp = currJSON.battery_temperature;
            let currTime = currJSON.timestamp;
            checkValueInRange(temp, currTime);
        } catch (error) {
            console.error(error);
        }
        websocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString());
            }
          });
    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});

export function shutDownServer(): void {
    console.log('Closing server');
    websocketServer.close();
    tcpServer.close(function () {
        tcpServer.unref();
    });
}

