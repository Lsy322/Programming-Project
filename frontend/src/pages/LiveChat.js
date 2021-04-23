import React, {useEffect, useRef, useState,} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Button, Input} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Add} from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";


import useChatRoom from './useChatRoom'

const ENDPOINT = 'http://localhost:5000'

const LiveChat = () => {
    let {user} = useAuth0();
    
    const [rooms, setRooms] = useState([])
    const [roomTitle, setRoomTitle] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [addUser, setAddUser] = useState()
    const [enteredRoom, setEnteredRoom] = useState('')
    const [enteredRoomTitle, setEnteredRoomTitle] = useState('')
    const [messageToBeSend, setMessageToBeSend] = useState()

    const getRoomData = (roomId) =>{
        axios.get(ENDPOINT + `/chat/getRoomData/${roomId}`)
            .then(res => {
                console.log(res.data)
                setMessages(res.data.messages)
                setUsers(res.data.users)
            })
    }

    const {sendData, newRoomData} = useChatRoom(enteredRoom)

    const enterRoom = (e) => {
        e.preventDefault(false)
        setEnteredRoom(e.target.id)
        setEnteredRoomTitle(e.target.name)
        getRoomData(e.target.id)
    }

    useEffect(() => {
        if(newRoomData.length !== 0){
            setMessages(newRoomData.messages)
            setUsers(newRoomData.users)
        }
    }, [newRoomData])


    let roomList = (
        rooms.map(room =>
            <div key={room._id} >
                <form id={room._id} name={room.title} onSubmit={enterRoom}>
                    <Button
                        size='large'
                        fullWidth
                        style={{justifyContent: "flex-start", color: '#f5f5f5', textTransform: 'none'}}
                        variant='outlined'
                        type={'submit'}
                    >
                        {room.title}
                    </Button>
                </form>
            </div>
        )
    )

    const getRooms = () =>{
        axios.get(ENDPOINT + `/chat/getRooms/${user.sub}`)
            .then(res => setRooms(res.data))
    }

    const createRoom = (e) =>{
        //e.preventDefault(false)
        axios.post(ENDPOINT + '/chat/createRoom', {
            roomTitle: roomTitle,
            user: user
        })
        setRoomTitle('')
    }

    let createRoomForm = (
        <div style={{
            width: '25%',
            height: '100%',
            float: 'inherit',
            background: '#cdcdcd'
        }}>
            <form onSubmit={createRoom}>
                <Input
                    size='large'
                    fullWidth
                    value={roomTitle}
                    required={true}
                    placeholder={'Type room title'}
                    onInput={e => setRoomTitle(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton size='small' type={'submit'}>
                                <Add/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </form>
        </div>
    )


    const addUserToRoomBtn = (e) =>{
        e.preventDefault(false)
        axios.put(ENDPOINT + '/chat/addUser', {
            email : addUser,
            roomId: enteredRoom
        })
            .then(() => {
                sendData()
            })
        setAddUser('')
    }

    const sendMessageBtn = (e) =>{
        e.preventDefault(false)
        axios.put(ENDPOINT + '/chat/sendMessage', {
            roomId: enteredRoom,
            author: user,
            message: messageToBeSend
        })
            .then(() => sendData())
        setMessageToBeSend('')
    }


    useEffect(() => {
        getRooms()
    }, [ENDPOINT]);


    const bottomRef = useRef()
    const scrollToBottom = () =>{
        if(messages.length !== 0){
            const scroll = bottomRef.current.scrollHeight - bottomRef.current.clientHeight;
            bottomRef.current.scrollTo(0, scroll);
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const roomContainer = (
        <div className={'roomContainer'}
            style={
                 {
                     float: 'left',
                     width: '25%',
                     height: '100%',
                     overflow: 'auto',
                     background: '#2c3e50',
                 }
             }
        >
            {roomList}
        </div>
    )

    const defaultLayout = (
        <div style={{
            background: 'white',
            float: 'left',
            width: '50%'
        }}>
        </div>
    )
    const notEnteredRoom = (
        <div style={{
            background: 'white',
            float: 'left',
            width: '50%',
        }}>
            <h2>Choose room or create new room</h2>
        </div>
    )
    let getRoomTitle = defaultLayout
    let messageContainer = notEnteredRoom
    let messageForm = defaultLayout
    let getUserListTitle = defaultLayout
    let userContainer = defaultLayout
    let addUserToRoomForm = defaultLayout
    if(enteredRoom !== ''){
        getRoomTitle = (
            <div
                style={{
                    fontSize: 30,
                    color: '#32465a',
                    width: '50%',
                    height: '100%',
                    fontWeight: 'bold',
                    float: 'inherit',
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    background: '#adb3b3'
                }}
            >
                <p style={{marginLeft: '10px'}}>
                    {enteredRoomTitle}
                </p>
            </div>
        )
        messageContainer = (
            <div className={'messageContainer'}
                 ref={bottomRef}
                 style={
                     {
                         float: 'left',
                         width: '50%',
                         height: '100%',
                         overflow: 'auto',
                         background: '#E6EAEA'
                     }
                 }
            >
                    {messages.map(message =>     //Mapping message
                        <div key={message._id} style={{clear: 'both'}}>
                            {message.author.sub === user.sub ? (
                                <p style={{
                                    background: '#f5f5f5',
                                    color: '#32465a',
                                    maxWidth: '80%',
                                    display: 'inline-block',
                                    borderRadius: '20px',
                                    padding: '10px 15px',
                                    verticalAlign: 'baseline',
                                    float: 'right',
                                    margin: '10px',
                                    overflowWrap: 'break-word'
                                }}>
                                    <pre>{message.author.email + "   ~" + message.author.nickname}</pre>
                                    <hr></hr>
                                    {message.message} 
                                    <br></br>
                                    <span style={{float: 'right', fontSize:"1px"}}>{new Date(message.createdAt).toLocaleTimeString()}</span>
                                </p>
                            ):(
                                <p style={{
                                    background: '#435f7a',
                                    color: '#f5f5f5',
                                    maxWidth: '80%',
                                    display: 'inline-block',
                                    borderRadius: '20px',
                                    padding: '10px 15px',
                                    verticalAlign: 'baseline',
                                    lineHeight: '130%',
                                    margin: '10px',
                                    overflowWrap: 'break-word'
                                }}>
                                    
                                    <pre>{message.author.email + "   ~" + message.author.nickname}</pre>
                                    <hr></hr>
                                    {message.message} 
                                    <br></br>
                                    <span style={{float: 'right', fontSize:"1px"}}>{new Date(message.createdAt).toLocaleTimeString()}</span>
                                </p>
                            )}
                        </div>
                    )}
            </div>
        )
        messageForm = (
            <div style={{
                width: '50%',
                height: '100%',
                float: 'inherit',
                background: '#cdcdcd'
            }}>
                <form onSubmit={sendMessageBtn}>
                    <Input
                        size='large'
                        fullWidth
                        value={messageToBeSend}
                        required={true}
                        placeholder={'Type message'}
                        onInput={e => setMessageToBeSend(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton size='small' type={'submit'}>
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </form>
            </div>
        )
        getUserListTitle = (
            <div
                style={{
                    fontSize: 20,
                    color: '#f5f5f5',
                    fontWeight: 'bold',
                    height: '100%',
                    width: '25%',
                    float: 'inherit',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#2c3e50'
                }}
            >User List</div>
        )
        userContainer = (
            <div className={'userContainer'}
                 style={
                     {
                         float: 'left',
                         width: '25%',
                         height: '100%',
                         overflow: 'auto',
                         background: '#2c3e50'
                     }
                 }
            >
                {users.map(user =>
                    <div key={user.email}>
                        <Button
                            size='large'
                            fullWidth
                            style={{justifyContent: "flex-start", color: '#f5f5f5', textTransform: 'none'}}
                            variant='outlined'
                            type={'submit'}
                        >
                            {user.email}
                        </Button>

                    </div>
                )}
            </div>
        )
        addUserToRoomForm = (
            <div style={{
                width: '25%',
                height: '100%',
                float: 'inherit',
                background: '#cdcdcd'
            }}>
                <form onSubmit={addUserToRoomBtn}>
                    <Input
                        size='large'
                        fullWidth
                        value={addUser}
                        required={true}
                        placeholder={'Type email'}
                        onChange={e => setAddUser(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton size='small' type={'submit'}>
                                    <Add/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </form>
            </div>
        )
    }


    return(
        <div style={{
            width: '100%',
            height: '89.1vh',
            marginTop: '10px'
        }}>
            <div className={'top'}
                 style={{width: '100%', height: '10%', float: 'left'}}
            >
                <div style={{
                    width: '25%',
                    height: '100%',
                    float: 'inherit',
                    background: '#2c3e50',
                    color: '#f5f5f5',
                    fontWeight: 'bold',
                    fontSize: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    Room List
                </div>
                {getRoomTitle}
                {getUserListTitle}
            </div>


            <div className={'body'}
                 style={{width: '100%', height: '85%', float: 'left'}}
            >
                {roomContainer}
                {messageContainer}
                {userContainer}
            </div>

            <div className={'bottom'}
                 style={{
                     width: '100%',
                     height: '5%',
                     float: 'left',
                 }}
            >

                {createRoomForm}
                {messageForm}
                {addUserToRoomForm}

            </div>

        </div>
    )
}


export default LiveChat;