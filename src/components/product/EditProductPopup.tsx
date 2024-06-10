import { ProductType, Category } from "@/lib/types"
import { useAppDispatch} from "@/lib/hooks"
import { updateProduct } from "@/lib/features/products/productsSlice";
import styles from "./editProductPopup.module.css"


export default function EditProductPopup({productForEdit, categories, editPopUp, setEditPopup}: {productForEdit: ProductType, categories: Category[] | null, editPopUp: boolean, setEditPopup: (value: boolean) => void
})  {
	const dispatch = useAppDispatch();
	function handleProductEdit(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
			product: formData,
			token: localStorage.getItem('token'),
		};
		try {
			dispatch(updateProduct(data));
		} catch (error) {
			console.error(error);
		}
		setEditPopup(false);
	}
	return (
		<div>
			<form encType="multipart/form-data" onSubmit={handleProductEdit}>
				<input type="hidden" name="productId" value={productForEdit._id} />
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" defaultValue={productForEdit.name} />
				<label htmlFor="price">Price</label>
				<input type="number" id="price" name="price" defaultValue={productForEdit.price} />
				<label htmlFor="quantity">Quantity</label>
				<input type="number" id="quantity" name="quantity" defaultValue={productForEdit.quantity} />
				<label htmlFor="offer">Offer</label>
				<input type="number" id="offer" name="offer" defaultValue={productForEdit.offer} />
				<label htmlFor="description">Description</label>
				<textarea id="description" name="description" defaultValue={productForEdit.description}></textarea>
				{productForEdit.productImages && productForEdit.productImages.length > 0 && (
					<div>
						<p>Images</p>
						{productForEdit.productImages.map((image, index) => (
							<div key={`${index}-image-edit `}>
								<img src={`${process.env.NEXT_PUBLIC_IMAGES}/${image.img}`} alt={productForEdit.name} className={styles.product_image} />
								<button>Delete</button>
							</div>
						))}
					</div>
				)}
				<label htmlFor="newImage">New Images</label>
				<input type="file" id="newImage" name="productImages" multiple />
				<label htmlFor="category">Category</label>
				{categories && categories.length > 0 && (
					<select name="category" id="category">
						{categories.map((category) => (
							<option key={category._id} value={category._id}>{category.name}</option>
						))}
					</select>
				)}
				<button type="submit">Edit</button>
			</form>
		</div>
	)
}