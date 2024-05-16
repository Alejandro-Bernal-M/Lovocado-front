
const apiEndPoints = {
  signup: process.env.NEXT_PUBLIC_API+'/signup',
  signin: process.env.NEXT_PUBLIC_API+'/signin',
  getAllProducts: process.env.NEXT_PUBLIC_API+'/products',
  getProduct: process.env.NEXT_PUBLIC_API+'/product',
  createProduct: process.env.NEXT_PUBLIC_API+'/products',
  updateProduct: process.env.NEXT_PUBLIC_API+'/product',
  deleteProduct: process.env.NEXT_PUBLIC_API+'/product',
  addReviewToProduct: process.env.NEXT_PUBLIC_API+'/product/review',
  getCategories: process.env.NEXT_PUBLIC_API+'/categories',
  createCategory: process.env.NEXT_PUBLIC_API+'/categories',
  updateCategory: (id: string) => process.env.NEXT_PUBLIC_API+`/categories/${id}`,
  deleteCategory: (id: string) => process.env.NEXT_PUBLIC_API+`/categories/${id}`,
}

export default apiEndPoints;