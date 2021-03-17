import React ,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    'Add annotation',
    'View annotation',
    'set Permission', 
];

const VerticalMoreButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
        aria-label='more'
        aria-controls='customized-menu'
        aria-haspopup='true'
        onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>

        <Menu
        id = 'post_action'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        >
        {options.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
                {option}
            </MenuItem>
        ))}
        </Menu>
        </div>
        
        
    );
}

export default VerticalMoreButton;