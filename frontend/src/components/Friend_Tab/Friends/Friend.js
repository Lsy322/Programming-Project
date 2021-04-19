import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

const Friend = ({friend}) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={friend.picture} />
            </ListItemAvatar>
            <ListItemText primary={friend.nickname} />
            <ListItemSecondaryAction>
                <IconButton  edge='end' aria-label='delete-friend'>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Friend
