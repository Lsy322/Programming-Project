import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteFriend } from '../../../context/action/User';

const Friend = ({friend}) => {
    const {user} = useAuth0();
    const dispatch = useDispatch();

    const handleDeleteFriendClick = () => {
        const user_id_to_be_sent = user.sub.substring(user.sub.indexOf('|')+1);
        const remove_id_to_be_sent = friend.user_id.substring(friend.user_id.indexOf('|')+1);
        dispatch(deleteFriend(user_id_to_be_sent,remove_id_to_be_sent));    
    }
    
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={friend.picture} />
            </ListItemAvatar>
            <ListItemText primary={friend.nickname} />
            <ListItemSecondaryAction>
                <IconButton  edge='end' aria-label='delete-friend' onClick={handleDeleteFriendClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Friend
