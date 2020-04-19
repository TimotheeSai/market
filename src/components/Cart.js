import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Divider from "@material-ui/core/es/Divider/Divider";
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

import CartModal from "./CartModal"


const ValidateButton = (props) => {
    return (
        <Button
            variant="contained"
            disabled={props.disabled}
            size="large"
            fullWidth
            onClick={props.onClick}
        >
            Valider mon panier
        </Button>
    )
};


class Cart extends Component {
    constructor (props) {
        super(props);
        this.modal = React.createRef();
        this.state = {
            cartList: this.props.productList,
            cartValue: 0,
        };
    }

    updateCart = (inCart) => {
        inCart.forEach(p=>{p.price = p.unitPrice*p.quantity});
        this.setState({
            cartList: inCart,
            cartValue: inCart.map(p => p.price).reduce((a,b) => a + b, 0)
        })
    };

    removeFromCart = ({id}) => {
        const cartList = this.state.cartList.filter(p => p.id !== id);
        this.updateCart(cartList);
        this.props.removeFromCart(id)

    };

    render () {
        return (
            <Grid item  xs={12}>
                {this.state.cartList.length ? (
                    <div>
                        <CartModal ref={this.modal}
                                   productList={this.state.cartList}
                                   cartValue={this.state.cartValue}
                                   removeFromCart={this.removeFromCart}
                        />
                        {/*<ValidateButton disabled={false} onClick={()=>{this.modal.current.handleClickOpen()}}/>*/}
                        <div className="cartList">
                            <List dense={false}>
                                {this.state.cartList.map((prd, index) => {
                                    return(
                                        <div key={prd.id}>
                                            <ListItem >
                                                <ListItemText
                                                    primary={`${prd.name}    x ${prd.quantity}`}
                                                    secondary={`${prd.price} €`}
                                                />
                                                <Button onClick={() => {this.removeFromCart(prd)}}>
                                                    <RemoveShoppingCartOutlinedIcon />
                                                </Button>
                                            </ListItem>
                                            {index < this.state.cartList.length -1 ?
                                                <Divider variant="inset" component="li"/> : null}
                                        </div>
                                    )}
                                )}
                            </List>
                            <Divider variant="middle" />
                            <p>
                                {`Total ${this.state.cartValue} €`}
                            </p>
                            <Divider variant="middle" />
                            <ValidateButton disabled={false} onClick={()=>{this.modal.current.handleClickOpen()}}/>

                        </div>
                    </div>
                    ):(
                    <ValidateButton disabled={true}/>
                )}

            </Grid>
        )
    }
}


export default Cart