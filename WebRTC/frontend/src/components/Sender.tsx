import { useEffect, useState } from "react";

export function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
    setSocket(socket);
  }, []);

  async function startSendingVideo() {
    // create an offer
    const pc = new RTCPeerConnection();
    const offer = await pc.createOffer();   // sdp
    await pc.setLocalDescription(offer);
    socket?.send(JSON.stringify({ type: 'createOffer', sdp: pc.localDescription }));

    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'createAnswer') {
        pc.setRemoteDescription(data.sdp);
      }
    }
  }

  return (
    <div>
      Sender
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  );
}
