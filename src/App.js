import React from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';
// import { throwStatement } from '@babel/types';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      products:[],
      filteredProducts:[],
      cartItems:[]
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
  }
  componentWillMount(){
      fetch("http://localhost:3000/products/")
      .then(res => res.json())
      .then(data => this.setState(
      {products: data, 
        filteredProducts:data
      }));
    }

  handleChangeSort(e){
    this.setState(
      {sort: e.target.value}
      );
    this.listProducts();
  }
  handleChangeSize(e){
    this.setState(
      {size: e.target.value}
      );
    this.listProducts();
  }

  listProducts(){
    this.setState(state =>{
      if(state.sort !== "id") {
        state.products.sort((a,b) =>(state.sort==='lowest') ? (a.price < b.price)? -1:1 : (a.price< b.price)? 1:-1)
      }else {
        state.products.sort((a,b)=> (a.id < b.id)? -1:1)
      }
      if(state.size !== "" && state.size !== undefined){
        return {filteredProducts: state.products.filter (a => a.availableSizes.indexOf(state.size.toUpperCase())>=0)
      }}
      return {filteredProducts:state.products};
    })
  }
  
  render () {
    return (
      <div className='container'>
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr/>
        <div className="row">
          <div className="col-md-8">
            <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
            handleChangeSort ={this.handleChangeSort} count = {this.state.filteredProducts.length}/>
            <hr/>
            <Products products= {this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
          
          </div>
          <div className="col-md-4">
            <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
