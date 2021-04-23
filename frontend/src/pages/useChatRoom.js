import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:4000'
const useChatRoom = (roomId) => {
    const [newRoomData, setNewRoomData] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        if(roomId !== ''){
            socketRef.current = io(ENDPOINT, {
                query: {
                    roomId: roomId
                }
            })

            socketRef.current.on('update', (data) => setNewRoomData(data))

            return () => {
                socketRef.current.disconnect()
            }
        }

    }, [roomId])

    const sendData = () => {
        socketRef.current.emit('update', roomId)
    }


    return {sendData, newRoomData}
}

export default useChatRoom