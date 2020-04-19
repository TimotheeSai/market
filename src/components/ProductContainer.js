import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar'

import ProductList from "./ProductList";
import Cart from "./Cart"
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";




class ProductContainer extends Component {
    constructor (props) {
        super(props);
        this.cart = React.createRef();
        this.productListContainer = React.createRef();
        this.state = {
            productList: this.props.productList,
            inCartProducts: [],
            searchString: "",
        }
    }

    onSearchInputChange = (event) => {
        // console.log("Search changed ..." + event.target.value);
        if (event.target.value) {
            this.setState({
                searchString: event.target.value.toLowerCase()
            }, () => {
                let filtered = this.state.productList.filter(p => p.name.toLowerCase().includes(this.state.searchString));
                this.productListContainer.current.filterProductlist(filtered);
            });
        } else {
            this.setState({searchString: ''});
            this.productListContainer.current.filterProductlist(this.state.productList)
        }
    };

    productToCart = (productInfo) => {
        const id = productInfo.id;
        if (!this.state.inCartProducts.includes(id)) {
            this.state.inCartProducts.push(id);
        }
            let inCart = this.state.productList
                .filter(p =>this.state.inCartProducts.includes(p.id));
            this.cart.current.updateCart(inCart);

    };

    removeFromCart = (id) => {
        this.setState({
            inCartProducts: this.state.inCartProducts.filter(i => i !== id),
        })
    };

    render () {
        return (
            <Container id={"ProductContainer"}
                       style={{ padding: 40, margin: 'auto', background: "white"}} maxWidth={"xl"}>
                <Typography gutterBottom variant="h4">Les Produits</Typography>

                <Toolbar>
                    <TextField style={{padding: 24}}
                               id="searchInput"
                               placeholder="Rechercher un produit"
                               margin="normal"
                               onChange={this.onSearchInputChange}
                    />
                </Toolbar>
                    <Grid container >
                        <Grid item container xs={9} style={{padding: 20 ,backgroundColor: 'white'}} >
                            <ProductList
                                productList={this.state.productList}
                                cartUpdater={this.productToCart}
                                searchString={this.state.searchString}
                                ref={this.productListContainer}
                            />
                        </Grid>
                        <Grid container item xs={3} style={{padding: 10 ,backgroundColor: 'white'}}>
                            <Cart productList={this.state.inCartProducts}
                                  ref={this.cart}
                                  removeFromCart={this.removeFromCart}
                            />
                        </Grid>
                    </Grid>

            </Container>
        )
    }
}


export default ProductContainer