import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import ProductModal from "./ProductModal"


const classes = {
    root: {
        minWidth: 275,
        minHeight:275,
    },
    img: {
        height: 0,
        paddingTop: '56.25%',
    },
    cartButton: {
        display: 'flex',
        justifyContent:'right',
        alignItems:'right',
        color: '#009410',
    }
};
class Product extends Component {
    constructor (props) {
        super(props);
        this.modal = React.createRef();
        this.state = {
            productInfo: this.props.productInfo
        }
    }

    sendToCart = (item) => {
        this.props.cartUpdater(item)
    };
    render () {
        return(
            <div>
                { this.props.productInfo ? (
                    <Paper elevation={15}>
                        <Card style={classes.root} >
                            <CardMedia
                                style={classes.img}
                                image={this.props.productInfo.imagePath}
                                title={this.props.productInfo.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.props.productInfo.name}
                                </Typography>
                                <Typography component="p">
                                    {this.props.productInfo.description}
                                </Typography>
                                <Typography component="p">
                                    {`${this.props.productInfo.unitPrice} €/${this.props.productInfo.unit}`}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing  style={classes.cartButton}>
                                <ProductModal ref={this.modal}
                                              productInfo={this.state.productInfo}
                                              sendToCart={this.sendToCart}/>
                                <Button size="small"
                                        color="primary"
                                        // style={classes.cartButton}
                                        variant="contained"
                                        fullWidth
                                    // disabled={this.props.productInfo.inCart}
                                        onClick={()=>{this.modal.current.handleClickOpen()}}>
                                    Ajouter au panier
                                    <AddShoppingCartIcon />
                                </Button>

                            </CardActions>
                        </Card>
                    </Paper>
                ) : null}
            </div>
        )
    }



}
export default Product