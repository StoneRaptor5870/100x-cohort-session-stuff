import { useEffect, useState, useRef } from 'react';

export function Sender() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Sender WebSocket connected');
      socket.send(JSON.stringify({ type: 'sender' }));
    };
    socket.onmessage = (event) => {
      console.log('Sender received message:', event.data);
    };
    setSocket(socket);
  }, []);

  async function startSendingVideo() {
    if (!socket) {
      return;
    }

    const pc = new RTCPeerConnection();

    pc.onnegotiationneeded = async () => {
      console.log('Sender negotiation needed');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('Sender created offer:', offer);
      socket.send(
        JSON.stringify({ type: 'createOffer', sdp: pc.localDescription })
      );
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sender ICE candidate:', event.candidate);
        socket.send(
          JSON.stringify({ type: 'iceCandidate', candidate: event.candidate })
        );
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Sender received:', data);
      if (data.type === 'createAnswer') {
        pc.setRemoteDescription(data.sdp);
        console.log('Sender set remote description:', data.sdp);
      } else if (data.type === 'iceCandidate') {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log('Sender added ICE candidate:', data.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    console.log('Sender got stream:', stream);
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      playVideo();
    }
  }

  const playVideo = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        await videoRef.current.play();
        console.log('Playback started successfully.');
      } catch (error) {
        console.error('Failed to start playback:', error);
      }
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "100px"}}>
      Sender
      <video ref={videoRef} autoPlay width="800" height="500"></video>
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  );
}