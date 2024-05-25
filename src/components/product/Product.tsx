import type { ProductType } from '@/lib/types';
import strict from './product.module.css';
import { useState } from 'react';

export default function Product(product: ProductType){
  const [currentImage, setCurrentImage] = useState(0);
  return(
    <div>
      <h2>{product.name}</h2>
      <p>Created by: {product.createdBy?.firstName}</p>
      {product.productImages && (
        <>
          {product.productImages.length > 1 && currentImage > 0 && (
            <button onClick={() => {setCurrentImage(currentImage - 1)}} >Previous Image</button>
          )}
          <img src={`${process.env.NEXT_PUBLIC_IMAGES}/${product.productImages[currentImage].img}`} alt={product.name} className={strict.product_image}/>
          {product.productImages.length > 1 && currentImage +1 < product.productImages.length && (
            <button onClick={() => {setCurrentImage(currentImage + 1)}} >Next Image</button>
          )
          }
        </>
      )}
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  )
}
