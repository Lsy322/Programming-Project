import React, {useEffect, useState,} from 'react';
import {useHistory, Route, Switch, useParams, useRouteMatch,} from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'


const ENDPOINT = 'http://localhost:5000'

// const IsMatch = (id) =>{
//     let rooms = ''
//     axios.get('http://localhost:5000/liveChat/allRoomId')
//         .then(res => {rooms = res.data})
//
//     if(id != ''){
//         for(let i = 0; i<rooms.length;i++){
//             if(id==rooms[i]){
//                 return LiveChat(id)
//             }
//         }
//     }
// }


const LiveChat = () =>{
    const history = useHistory();
    const [userName, setUserName] = useState('')
    const [roomId, setRoomId] = useState('')

    let { path } = useRouteMatch();

    const createRoom = (e) => {
        e.preventDefault(false)
        axios.get(ENDPOINT + '/liveChat/createRoom', {
            userName: userName
        })
            .then(res => toChatRoom(userName, res.data))
    }

    const Join = (e) => {
        e.preventDefault(false)
        axios.get(ENDPOINT + `/liveChat/${roomId}`, {
            userName: userName,

        })
            .then(res => toChatRoom(userName, res.data))
            .catch(err => console.log(err))
    }
    const toChatRoom = (userName, id) =>{
        history.push(`/liveChat/${userName}/${id}`)
    }

    return(
        <Switch>
            <Route exact path={path}>
                <div>
                    <form onSubmit={createRoom}>
                        <input
                            value={userName}
                            required={true}
                            placeholder={'Name'}
                            onInput={e => setUserName(e.target.value)}
                        />
                        <button type={"submit"}>Create Room</button>
                    </form>
                    <form onSubmit={Join}>
                        <input
                            value={userName}
                            required={true}
                            placeholder={'Name'}
                            onInput={e => setUserName(e.target.value)}
                        />
                        <input
                            value={roomId}
                            required={true}
                            placeholder={'Room id'}
                            onInput={e => setRoomId(e.target.value)}
                        />
                        <button type={"submit"}>Join Room</button>
                    </form>
                </div>
            </Route>
            <Route path={`${path}/:userName/:roomId`}>
                <ChatRoom />
            </Route>
        </Switch>

    )

}

const ChatRoom = () => {

    let {userName, roomId} = useParams();
    let socket
    //console.log(userName, roomId)
    useEffect(() => {
        console.log('trigger')

        socket = io(ENDPOINT)
        //socket.emit('join')

        return () => {
            //socket.emit('disconnect', userName, roomId)
            socket.off()
        }
    }, [ENDPOINT]);

    return(
        <div>
            <h2>{userName}</h2>
            <h2>{roomId}</h2>
        </div>
    )
}


export default LiveChat;