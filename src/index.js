import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Client from 'shopify-buy'
import './app.css'

export const client = new Client({
  storefrontAccessToken: '271343b2eefed9420df1c81558bb89be',
  domain: 'wipe-ya-docs-off-hell-store.myshopify.com',
})

ReactDOM.render(<App client={client} />, document.getElementById('root'))
