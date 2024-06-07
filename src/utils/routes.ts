
const apiEndPoints = {
  signup: process.env.NEXT_PUBLIC_API+'/signup', // method: POST
  signin: process.env.NEXT_PUBLIC_API+'/signin', // method: POST
  getAllProducts: process.env.NEXT_PUBLIC_API+'/products', // method: GET
  getProduct: process.env.NEXT_PUBLIC_API+'/product', // method: GET
  createProduct: process.env.NEXT_PUBLIC_API+'/products', // method: POST
  updateProduct: process.env.NEXT_PUBLIC_API+'/product', // method: PUT
  deleteProduct: process.env.NEXT_PUBLIC_API+'/product', // method: DELETE
  addReviewToProduct: process.env.NEXT_PUBLIC_API+'/product/review', // method: POST
  getCategories: process.env.NEXT_PUBLIC_API+'/categories', // method: GET
  createCategory: process.env.NEXT_PUBLIC_API+'/categories', // method: POST
  updateCategory: (id: string) => process.env.NEXT_PUBLIC_API+`/categories/${id}`, // method: PUT
  deleteCategory: (id: string) => process.env.NEXT_PUBLIC_API+`/categories/${id}`, // method: DELETE
  addProductToCart: process.env.NEXT_PUBLIC_API+'/cart/add', // method: POST
  removeProductFromCart: (id: string) => process.env.NEXT_PUBLIC_API+`/cart/remove/${id}`, // method: DELETE
  clearCart: process.env.NEXT_PUBLIC_API+'/cart/clear', // method: DELETE
  checkProductsForCheckout: process.env.NEXT_PUBLIC_API+'/cart/checkout', // method: GET
}

export default apiEndPoints;