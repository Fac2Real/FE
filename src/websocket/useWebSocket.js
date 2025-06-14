import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const WEBSOCKET_URL = import.meta.env.VITE_BACKEND_URL + "/ws";

// 웹소켓 연결과 관련한 hook 함수
// topic: STOMP채널의 주소
// onMessage: 서버로부터 메시지를 받았을 때 실행할 콜백 함수
export default function useWebSocket(topic, onMessage, isLoggedIn) {
  const clientRef = useRef(); // 웹소켓 연결 객체 저장할 변수
  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = new SockJS(WEBSOCKET_URL);

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 5초 간격으로 재연결 시도

      // onConnect: 연결 성공 시 호출할 함수
      onConnect: () => {
        // topic으로부터 메시지를 구독하고, 메시지를 받으면 JSON으로 파싱해서 콜백함수로 전달합니다.
        client.subscribe(topic, (message) => {
          const payload = JSON.parse(message.body);
          onMessage(payload);
        });
      },
      onStompError: (frame) => {
        console.log("STOMP 에러=================");
        console.log(frame);
        console.log("===========================");
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [topic, onMessage]);
}

// 왼쪽 하단 갯수
export function useWebSocket2(topic, onMessage, isLoggedIn) {
  const clientRef = useRef(); // 웹소켓 연결 객체 저장할 변수
  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = new SockJS(WEBSOCKET_URL);
    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 5초 간격으로 재연결 시도

      // onConnect: 연결 성공 시 호출할 함수
      onConnect: () => {
        // topic으로부터 메시지를 구독하고, 메시지를 받으면 JSON으로 파싱해서 콜백함수로 전달합니다.
        client.subscribe(topic, (message) => {
          const payload = JSON.parse(message.body);
          onMessage(payload);
        });
      },
      onStompError: (frame) => {
        console.log("STOMP 에러=================");
        console.log(frame);
        console.log("===========================");
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [topic, onMessage]);
}

// 오른쪽 하단 알림
export function useWebSocket3(topic, onMessage, isLoggedIn) {
  const clientRef = useRef(); // 웹소켓 연결 객체 저장할 변수
  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = new SockJS(WEBSOCKET_URL);

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 5초 간격으로 재연결 시도

      // onConnect: 연결 성공 시 호출할 함수
      onConnect: () => {
        // topic으로부터 메시지를 구독하고, 메시지를 받으면 JSON으로 파싱해서 콜백함수로 전달합니다.
        client.subscribe(topic, (message) => {
          const payload = JSON.parse(message.body);
          onMessage(payload);
        });
      },
      onStompError: (frame) => {
        console.log("STOMP 에러=================");
        console.log(frame);
        console.log("===========================");
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
  }, [topic]);
}
