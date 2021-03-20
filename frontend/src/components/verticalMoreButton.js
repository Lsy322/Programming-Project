import React ,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//dialogs
import AddAnnotationDialog from './Add_Annotation/createAnnotation';
import ViewAnnotationDialog from  './View_Annotation/viewAnnotation';

const options = [
    'Add annotation',
    'View annotation',
    'set Permission', 
];

const VerticalMoreButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [AddDialogOpen, setAddDialogOpen] =useState(false);
    const [ViewDialoagOpen, setViewDialogOpen] = useState(false);

    const handleAddDialogOpen = () => {
        setAddDialogOpen(true);
    }
    
    const handleViewDialogOpen = () => {
        setViewDialogOpen(true);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenuItemClick = (e) => {
        if (e.target.textContent === 'Add annotation'){
            handleAddDialogOpen();
        }
        else if (e.target.textContent === 'View annotation'){
            handleViewDialogOpen();
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
        open={AddDialogOpen}
        setOpen={setAddDialogOpen}
        >
            
        </AddAnnotationDialog>

        <ViewAnnotationDialog
        open={ViewDialoagOpen}
        setOpen={setViewDialogOpen}>

        </ViewAnnotationDialog>
        </div>
       
    );
}

export default VerticalMoreButton;