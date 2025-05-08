// 이 요소는 화면 렌더링에 사용되지 않고, react 및 JSX 문법이 사용되지 않아 .js 파일로 작성되었습니다

// 메모: CORS 괜찮겠죠??

// stompClient :: 웹소켓 연결 로직!

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connectWebSocket(onMessageCallback) {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("웹소켓 연결 성공");
            stompClient.subscribe("/topic/zone/PID-001", (message) => {
                onMessageCallback(JSON.parse(message.body));
            });
        },
        onStompError: (frame) => {
            console.log("STOMP 에러");
            console.log(frame);
        }
    });
    stompClient.activate();
}