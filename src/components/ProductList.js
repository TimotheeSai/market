import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';


import Product from './Product';


class ProductList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            productList: this.props.productList,
        }
    }

    filterProductlist = (filteredProduct) => {
        this.setState({
            productList: filteredProduct
        })
    };

    render () {
        return (
            <Grid item xs={12} id={"ProductList"}>
                { this.state.productList.length ? (
                    <div>
                        <Grid container item spacing={1}>
                            { this.state.productList.map(product => (
                                <Grid  item  key={product.id}>
                                    <Product
                                        productInfo={product}
                                        cartUpdater={this.props.cartUpdater}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No products found" }
            </Grid>
        )
    }

}


export default ProductList;