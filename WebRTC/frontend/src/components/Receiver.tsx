import { useEffect, useRef } from "react";

export function Receiver() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect (() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'receiver' }));
    }

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc: RTCPeerConnection | null = null;
      if (message.type === 'createOffer') {
        // create an answer
        pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);

        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket?.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate}));
          }
        }

        pc.ontrack = (event) => {
          console.log(event);
          if (videoRef.current) {
            videoRef.current.srcObject = new MediaStream([event.track]);
          }
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket?.send(JSON.stringify({ type: 'createAnswer', sdp: pc.localDescription }));
      } else if (message.type === 'iceCandidate') {
        if (pc !== null) {
          // @ts-ignore
          pc.addIceCandidate(message.candidate);
        }
      }
    }
  }, []);

  return (
    <div>
      Receiver
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  )
}