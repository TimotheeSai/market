import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        minWidth: 600,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Market(props) {
    const market = props.market
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <span style={{
            padding: 20,
            // display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            margin: 'auto',
        }}>

            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {market.city}
            </Button>
            <Dialog onClose={handleClose}
                    maxWidth={"md"}
                    aria-labelledby="customized-dialog-title" open={open}
                    // style={{minWidth: 600}}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose} variant={"h5"}>
                    {`Marché de ${market.city}`}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom variant="h6">Lieux</Typography>
                    <Typography gutterBottom>
                        {market.location}
                    </Typography>
                    <Typography gutterBottom variant="h6">Jours</Typography>
                    <Typography gutterBottom component={"div"}>
                        <p> Les { market.days.join(', ')} </p>
                        <p>{`De ${market.hours[0]} à ${market.hours[1]}`}</p>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
    </span>

    );
}
