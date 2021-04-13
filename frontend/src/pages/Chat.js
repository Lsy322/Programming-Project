import React, {useEffect, useState,} from 'react';
import io from 'socket.io-client';

const Chat = () =>{
    const localVideoComponent = document.getElementById('local-video')
    const remoteVideoComponent = document.getElementById('remote-video')
    const socket = io()
    const mediaConstraints = {
        audio: true,
        video: { width: 1280, height: 720 },
    }
    let localStream
    let remoteStream
    let isRoomCreator
    let rtcPeerConnection // Connection between the local device and the remote peer.
    let roomId

// Free public STUN servers provided by Google.
    const iceServers = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },
        ],
    }

    const [roomInput, setRoomInput] = useState('')

// BUTTON LISTENER ============================================================
//     connectButton.addEventListener('click', () => {
//         joinRoom(roomInput)
//     })

    const join = () =>{
        joinRoom(roomInput)
    }

// SOCKET EVENT CALLBACKS =====================================================
    socket.on('room_created', async () => {
        console.log('Socket event callback: room_created')

        await setLocalStream(mediaConstraints)
        isRoomCreator = true
    })

    socket.on('room_joined', async () => {
        console.log('Socket event callback: room_joined')

        await setLocalStream(mediaConstraints)
        socket.emit('start_call', roomId)
    })

    socket.on('full_room', () => {
        console.log('Socket event callback: full_room')

        alert('The room is full, please try another one')
    })

    socket.on('start_call', async () => {
        console.log('Socket event callback: start_call')

        if (isRoomCreator) {
            rtcPeerConnection = new RTCPeerConnection(iceServers)
            addLocalTracks(rtcPeerConnection)
            rtcPeerConnection.ontrack = setRemoteStream
            rtcPeerConnection.onicecandidate = sendIceCandidate
            await createOffer(rtcPeerConnection)
        }
    })

    socket.on('webrtc_offer', async (event) => {
        console.log('Socket event callback: webrtc_offer')

        if (!isRoomCreator) {
            rtcPeerConnection = new RTCPeerConnection(iceServers)
            addLocalTracks(rtcPeerConnection)
            rtcPeerConnection.ontrack = setRemoteStream
            rtcPeerConnection.onicecandidate = sendIceCandidate
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
            await createAnswer(rtcPeerConnection)
        }
    })

    socket.on('webrtc_answer', (event) => {
        console.log('Socket event callback: webrtc_answer')

        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
    })

    socket.on('webrtc_ice_candidate', (event) => {
        console.log('Socket event callback: webrtc_ice_candidate')

        // ICE candidate configuration.
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: event.label,
            candidate: event.candidate,
        })
        rtcPeerConnection.addIceCandidate(candidate)
    })

// FUNCTIONS ==================================================================
    function joinRoom(room) {
        if (room === '') {
            alert('Please type a room ID')
        } else {
            roomId = room
            socket.emit('join', room)
        }
    }

    async function setLocalStream(mediaConstraints) {
        let stream
        try {
            stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        } catch (error) {
            console.error('Could not get user media', error)
        }

        localStream = stream
        localVideoComponent.srcObject = stream
    }

    function addLocalTracks(rtcPeerConnection) {
        localStream.getTracks().forEach((track) => {
            rtcPeerConnection.addTrack(track, localStream)
        })
    }

    async function createOffer(rtcPeerConnection) {
        let sessionDescription
        try {
            sessionDescription = await rtcPeerConnection.createOffer()
            rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch (error) {
            console.error(error)
        }

        socket.emit('webrtc_offer', {
            type: 'webrtc_offer',
            sdp: sessionDescription,
            roomId,
        })
    }

    async function createAnswer(rtcPeerConnection) {
        let sessionDescription
        try {
            sessionDescription = await rtcPeerConnection.createAnswer()
            rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch (error) {
            console.error(error)
        }

        socket.emit('webrtc_answer', {
            type: 'webrtc_answer',
            sdp: sessionDescription,
            roomId,
        })
    }

    function setRemoteStream(event) {
        remoteVideoComponent.srcObject = event.streams[0]
        remoteStream = event.stream
    }

    function sendIceCandidate(event) {
        if (event.candidate) {
            socket.emit('webrtc_ice_candidate', {
                roomId,
                label: event.candidate.sdpMLineIndex,
                candidate: event.candidate.candidate,
            })
        }
    }

    return(
        <div>
            <form onSubmit={join}>
                <input
                    value={roomInput}
                    required={true}
                    placeholder={'Room id'}
                    onInput={e => setRoomInput(e.target.value)}
                />
                <button type={"submit"}>Join Room</button>
            </form>
            <div id="video-chat-container" style="display: none">
                <video id="local-video" autoPlay="autoplay" muted="muted"></video>
                <video id="remote-video" autoPlay="autoplay"></video>
            </div>
        </div>

    )

}
export default Chat;