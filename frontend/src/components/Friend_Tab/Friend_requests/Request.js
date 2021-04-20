import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core'
import React from 'react'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {useDispatch, useSelector} from 'react-redux';
import { acceptFriendRequest } from '../../../context/action/User';
import { getFriend, getFriendRequest } from '../../../context/action/FriendSystem';
const Request = ({request}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const handleAcceptFriendClick = () => {
        const userid_to_be_sent = user.user_id.substring(6);
        const acceptId_to_be_sent = request.user_id.substring(6);
        dispatch(acceptFriendRequest(userid_to_be_sent,acceptId_to_be_sent));
    }
   
    const handleDeclineFriendClick = () => {
        const userid_to_be_sent = user.user_id    }
    
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={request.picture} />
            </ListItemAvatar>
            <ListItemText primary={request.nickname} />
            <ListItemSecondaryAction>
                <IconButton aria-label='accept' onClick={handleAcceptFriendClick}>
                    <CheckIcon />
                </IconButton>
                <IconButton aria-label='decline' onClick={handleDeclineFriendClick}>
                    <ClearIcon />
                </IconButton>
                
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Request;