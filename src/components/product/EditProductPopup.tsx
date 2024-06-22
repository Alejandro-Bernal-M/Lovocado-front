import { ProductType, Category } from "@/lib/types"
import { useAppDispatch } from "@/lib/hooks"
import { updateProduct } from "@/lib/features/products/productsSlice";
import { useState } from "react";
import styles from "./editProductPopup.module.css"

export default function EditProductPopup({productForEdit, categories, setEditPopup}: {productForEdit: ProductType, categories: Category[] | null, setEditPopup: (value: boolean) => void
})  {
	const [imagesToDeleteIds, setImagesToDeleteIds] = useState<string[]>([]);
	const [imagesToDelete, setImagesToDelete] = useState<{img:string}[]>([]);
	const dispatch = useAppDispatch();
	function handleProductEdit(e: any) {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('imagesToDeleteIds', JSON.stringify(imagesToDeleteIds));
		formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
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
		setImagesToDelete([]);
	}

	const handleImageDeletion = (imageId: string, img:string )=> {
		console.log('deleting')
		setImagesToDeleteIds([...imagesToDeleteIds, imageId]);
		setImagesToDelete([...imagesToDelete, {img: img}]);
	}

	const handleCancelImageDeletion = (imageId: string, img:string) => {
		setImagesToDeleteIds(imagesToDeleteIds.filter((id) => id !== imageId));
		setImagesToDelete(imagesToDelete.filter((image) => image.img !== img));
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
								<img src={`${process.env.NEXT_PUBLIC_IMAGES}${image.img}`} alt={productForEdit.name} className={styles.product_image} />
								<span onClick={() => handleImageDeletion(image._id, image.img)} >Delete Image</span>
								{imagesToDeleteIds.includes(image._id) && (
									<>
									<p>Image will be deleted</p>
									<span onClick={() => handleCancelImageDeletion(image._id, image.img)}> Cancel deletion</span>
									</>
								)}
							</div>
						))}
					</div>
				)}
				<label htmlFor="newImage">New Images</label>
				<input type="file" id="newImage" name="productImages" multiple/>
				<label htmlFor="category">Category</label>
				{categories && categories.length > 0 && (
					<select name="category" id="category" defaultValue={productForEdit.category._id}>
						{categories.map((category) => (
							<>
							<option key={category._id + 'createpopup'} value={category._id} >{category.name}</option>
							{category.children && category.children.length > 0 && category.children.map((child) => (
								<option key={child._id + 'child-create-popup'} value={child._id} >{child.name}</option>
							))
							}
							</>
						))}
					</select>
				)}
				<button type="submit">Edit</button>
				<button type="button" onClick={() => setEditPopup(false)}>Cancel</button>
			</form>
		</div>
	)
}