import { useEffect, useRef } from 'react';

export function Receiver() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    let pc: RTCPeerConnection | null = null;

    socket.onopen = () => {
      console.log('Receiver WebSocket connected');
      socket.send(JSON.stringify({ type: 'receiver' }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log('Receiver received message:', message);

      if (message.type === 'createOffer') {
        pc = new RTCPeerConnection();

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('Receiver ICE candidate:', event.candidate);
            socket.send(
              JSON.stringify({ type: 'iceCandidate', candidate: event.candidate })
            );
          }
        };

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

        pc.ontrack = (event) => {
          console.log('Receiver got track:', event.track);
          if (videoRef.current) {
            // Explicitly set the MIME type if necessary
            videoRef.current.srcObject = event.streams[0];
            console.log('Receiver set video stream:', event.streams[0]);

            playVideo();

            // Check for errors
            videoRef.current.onerror = (error) => {
              console.error('Error setting video stream:', error);
            };
          }
        };

        try {
          await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
          console.log('Receiver set remote description:', message.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          console.log('Receiver created answer:', answer);
          socket.send(
            JSON.stringify({ type: 'createAnswer', sdp: pc.localDescription })
          );
        } catch (error) {
          console.error('Error creating answer:', error);
        }
      } else if (message.type === 'iceCandidate') {
        if (pc) {
          try {
            pc.addIceCandidate(new RTCIceCandidate(message.candidate));
            console.log('Receiver added ICE candidate:', message.candidate);
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
        }
      }
    };
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "100px"}}>
      Receiver
      <video ref={videoRef} autoPlay muted width="800" height="500"></video>
    </div>
  );
}
