import React from 'react';
import FormatCurrency from '../util';

class Products extends React.Component {
    render(){
        const productItems = this.props.products.map( product =>
            <div className="col-md-4 thumbnail text-center" key={product.id}>
                <div>
                    <a href={`#${product.id} `} onClick ={(e) => this.props.handleAddToCart(e,product)}>
                        <img src={`/products/${product.sku}_2.jpg`} alt={product.title}/>
                        <p>{product.title}</p>
                    </a>
                </div>
                <div>
                    <b>{FormatCurrency(product.price)}</b>
                    <button className="btn btn-primary" onClick ={(e) => this.props.handleAddToCart(e,product)}>
                        Add to Cart</button> 
                </div>
            </div>
        )
        return(
            <div className="row">
                {productItems}
            </div>
        );

    }

}

export default Products;


