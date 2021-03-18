import React ,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddAnnotationDialog from './createAnnotation';
const options = [
    'Add annotation',
    'View annotation',
    'set Permission', 
];

const VerticalMoreButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] =useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    
    const closeDialog = () => {
        setDialogOpen(false);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenuItemClick = (e) => {
        if (e.target.textContent === 'Add annotation'){
            handleDialogOpen();
        }
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
            <MenuItem key={option} onClick={(e) => handleMenuItemClick(e)}>
                {option}
            </MenuItem>
        ))}
        </Menu>
        <AddAnnotationDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        >
            
        </AddAnnotationDialog>
        </div>
       
    );
}

export default VerticalMoreButton;