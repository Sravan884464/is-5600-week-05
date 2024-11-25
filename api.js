const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}


/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  res.json({ success: true })
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
});
const express = require('express');
const Products = require('./products');
const Orders = require('./orders');

async function createProduct(req, res, next) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function listProducts(req, res, next) {
  const { offset, limit, tag } = req.query;
  const products = await Products.list({ offset, limit, tag });
  res.json(products);
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id);
  res.json(product);
}

async function editProduct(req, res, next) {
  const product = await Products.edit(req.params.id, req.body);
  res.json(product);
}

async function deleteProduct(req, res, next) {
  const response = await Products.destroy(req.params.id);
  res.json(response);
}

async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function listOrders(req, res, next) {
  const { offset, limit, productId, status } = req.query;
  const orders = await Orders.list({ offset, limit, productId, status });
  res.json(orders);
}

async function getOrder(req, res, next) {
  const order = await Orders.get(req.params.id);
  res.json(order);
}

async function editOrder(req, res, next) {
  const order = await Orders.edit(req.params.id, req.body);
  res.json(order);
}

async function deleteOrder(req, res, next) {
  const response = await Orders.destroy(req.params.id);
  res.json(response);
}

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder,
};
