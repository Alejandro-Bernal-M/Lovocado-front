import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createProduct } from "@/lib/features/products/productsSlice";

export default function CreateProductPopup() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const { categories } = useAppSelector((state) => state.categories);

  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      product: formData,
      token: token,
    };

    try {
      const response = await dispatch(createProduct(data));
      // Handle response if needed
      console.log('response component', response);
      if(response.type === 'products/createProduct/fulfilled') {
        console.log('Product created successfully')
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleProductSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" required />
        
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
        
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" name="quantity" required />

        <label htmlFor="productImages">Product Images</label>
        <input type="file" id="productImages" name="productImages" accept="image/*" multiple required />

        <label htmlFor="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select Category</option>
          {categories && categories.length > 0 && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="offer">Discount</label>
        <input type="number" name="offer" min={0} max={100}/>


        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
