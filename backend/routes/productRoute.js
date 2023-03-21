const express = require('express');
const router  = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route("/products").get(isAuthenticatedUser, getAllProducts)

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)

router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)

router.route("/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails)




module.exports = router 