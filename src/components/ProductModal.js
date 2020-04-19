import React, { Component }  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle  from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Card from "@material-ui/core/es/Card/Card";
import ButtonGroup from "@material-ui/core/es/ButtonGroup/ButtonGroup";
import Slide from "@material-ui/core/Slide";

const classes = {
    root: {
        minWidth: 300,
        minHeight:300,
    },
    img: {
        height: 0,
        paddingTop: '56.25%',
    },
    cartButton: {
        display: 'flex',
        justifyContent:'right',
        alignItems:'center'
    },
    qtyButton: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    closeButton: {
        position: 'absolute',

    },
};

export default class ProductModal extends Component {
    constructor (props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            productInfo: this.props.productInfo,
            open: false,
            price: 0,
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    sendToCart = () => {
        if (this.state.productInfo.quantity > 0) {
            this.props.sendToCart(this.state.productInfo);
        }
        this.handleClose();
    };

    updateProductQuantity = (v) => {
        let item = this.state.productInfo;
        let qty = item.quantity;
        qty = v === "+" ? qty + 1 : qty - 1;
        item.quantity = qty <= 0 ? 0 : qty;
        this.setState({
            productInfo: item,
            price: item.unitPrice * qty
        });
    };


    render () {
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });

        return (
            <div >
                <Dialog
                    ref={this.wrapper}
                    open={this.state.open}
                    keepMounted
                    // TransitionComponent={null}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"  onClose={this.handleClose}>
                        {this.props.productInfo.name}
                    </DialogTitle>

                    <DialogContent dividers>
                        <Card style={classes.root} elevation={0}>
                            <CardMedia
                                style={classes.img}
                                image={this.props.productInfo.imagePath}
                                title={this.props.productInfo.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.props.productInfo.description}
                                </Typography>
                            </CardContent>
                        </Card>
                        <DialogContentText id="alert-dialog-slide-description">
                            Choisissez la quantité voulue
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={classes.qtyButton}>
                        <Button onClick={() => {this.updateProductQuantity("-")}} color="primary" >
                            <RemoveIcon/>
                        </Button>
                        {this.state.productInfo.quantity}
                        <Button onClick={() => {this.updateProductQuantity("+")}} color="primary">
                            <AddIcon/>
                        </Button>
                    </DialogActions>

                    <DialogActions>
                        <ButtonGroup variant="contained"
                                     color="primary"
                                     aria-label="contained primary button group"
                                     fullWidth
                        >
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.sendToCart} color="primary">
                                {`Total ${this.state.price} €`}
                            </Button>
                        </ButtonGroup>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}