import React, { Component } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
import Logo from './wydo.png'

class App extends Component {
  constructor() {
    super()

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
    }

    this.handleCartClose = this.handleCartClose.bind(this)
    this.addVariantToCart = this.addVariantToCart.bind(this)
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this)
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this)
  }

  componentWillMount() {
    this.props.client.checkout.create().then(res => {
      this.setState({
        checkout: res,
      })
    })

    console.log(this.props.client.product)

    this.props.client.product.fetchAll().then(res => {
      this.setState({
        products: res.sort((a, b) => {
          console.log(a.createdAt)
          let dateA = new Date(a.createdAt)
          let dateB = new Date(b.createdAt)
          return dateB - dateA
        }),
      })
    })

    this.props.client.shop.fetchInfo().then(res => {
      this.setState({
        shop: res,
      })
    })
  }

  addVariantToCart(variantId, quantity) {
    this.setState({
      isCartOpen: true,
    })

    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then(res => {
        this.setState({
          checkout: res,
        })
      })
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ]

    return this.props.client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(res => {
        this.setState({
          checkout: res,
        })
      })
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then(res => {
        this.setState({
          checkout: res,
        })
      })
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    })
  }

  render() {
    return (
      <div className="App">
        <nav role="banner">
          <div className="logo-wrapper">
            <img className="logo" src={Logo} />
          </div>
          <button
            className="App__view-cart"
            onClick={() => this.setState({ isCartOpen: true })}
          >
            Cart ({this.state.checkout.lineItems.length})
          </button>
        </nav>
        <Products
          client={this.props.client}
          products={this.state.products}
          addVariantToCart={this.addVariantToCart}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
        <footer className="site-footer">
          <div>Copywrite Wipe Ya Docs Off 2017</div>
          <div className="text-right">Powered by Shopify</div>
        </footer>
      </div>
    )
  }
}

export default App
