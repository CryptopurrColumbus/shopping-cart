import React from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      products:[],
      filteredProducts:[]
    };
  }
  componentWillMount(){
      fetch("http://localhost:3000/products").then(res => res.json())
      .then(data => this.setState(
      {products: data,
        filteredProducts:data
      }));
    }
  
  render () {
    return (
      <div className='container'>
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr/>
        <div className="row">
          <div className="column-md-8"></div>
          <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
          handleChangeSort ={this.handleChangeSort} count = {this.state.filteredProducts.length}/>
          <hr/>
            <Products products= {this.state.filteredProducts} handleAddToCard={this.handleAddToCard}/>
          <div className="column-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
