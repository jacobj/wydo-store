import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Client, { Config } from 'shopify-buy'
import './app.css'

const config = new Config({
  storefrontAccessToken: '271343b2eefed9420df1c81558bb89be',
  domain: 'wipe-ya-docs-off-hell-store.myshopify.com',
})

export const client = new Client(config)

ReactDOM.render(<App client={client} />, document.getElementById('root'))
