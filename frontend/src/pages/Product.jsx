import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart, cartItems, updateQuantity} =useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const currentQty = (size && cartItems[productId] && cartItems[productId][size]) ? cartItems[productId][size] : 0;

  const fetchProductData = async () => {
    if (!products) return;
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image?.[0] || '');
    }
  }


  useEffect(() => {
    fetchProductData();
  },[productId, products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/*----------------------- Product Data ---------------------------*/}


      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


        {/*---------------------- Product Images-------------------------- */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full gap-3'>
            {
              productData.image.map((item,index)=> (
                <img
                  onClick={()=> setImage(item)}
                  src={item}
                  key={index}
                  className='h-24 w-[24%] sm:w-full sm:mb-3 object-contain flex-shrink-0 cursor-pointer'
                  alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] flex items-center justify-center'>
            <img className='max-h-[600px] w-auto max-w-full object-contain' src={image} alt="" />
          </div>
        </div>


        {/*---------------------------- Product info--------------------------- */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <img src={assets.star_icon} alt="" className="w-4 h-4" />
            <img src={assets.star_icon} alt="" className="w-4 h-4" />
            <img src={assets.star_icon} alt="" className="w-4 h-4" />
            <img src={assets.star_icon} alt="" className="w-4 h-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)}
                  key={index} 
                  className={`border py-2 px-4 bg-gray-100 hover:border-black transition-all ${item===size? 'border-black font-medium':''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button> */}

          {currentQty === 0 ? (
            /* Show "ADD TO CART" if quantity is 0 */
            <button 
              onClick={() => addToCart(productData._id, size)} 
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
            >
              ADD TO CART
            </button>
          ) : (
            /* Show Plus/Minus controls if quantity is > 0 */
            <div className='flex items-center gap-4'>
              <div className='flex items-center border border-gray-300'>
                <button 
                  onClick={() => updateQuantity(productData._id, size, currentQty - 1)}
                  className='px-4 py-2 bg-black text-white hover:bg-gray-100 hover:text-black transition'
                >
                  -
                </button>
                
                <span className='px-4 py-2 font-medium border-x border-gray-300'>
                  {currentQty}
                </span>
                
                <button 
                  onClick={() => updateQuantity(productData._id, size, currentQty + 1)}
                  className='px-4 py-2 text-white bg-black hover:bg-gray-100 hover:text-black transition'
                >
                  +
                </button>
              </div>
              <p className='text-sm text-gray-400 font-medium'>In Cart (Size: {size})</p>
            </div>
          )}



          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this Product</p>
            <p>Easy Retuen and Exchange policy within 7days</p>
          </div>
        </div>

      </div>



      {/*-------------------- description and review section------------------ */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Welcome to our e-commerce website, a modern shopping destination designed to make your online buying experience simple, secure, and enjoyable. We offer a wide selection of high-quality products carefully chosen to meet everyday needs and evolving lifestyle trends. From the latest essentials to popular new arrivals, our store brings convenience right to your fingertips. With easy navigation, secure payment options, and fast, reliable delivery, shopping with us is smooth from start to finish. Customer satisfaction is at the heart of everything we do, which is why we focus on competitive pricing, transparent policies, and responsive support. Whether you are shopping for yourself or searching for the perfect gift, our platform ensures a hassle-free experience every time. Discover great deals, trusted brands, and products you can rely on, all in one place. Shop confidently and enjoy the comfort of online shopping tailored to your needs.
          </p>
        </div>
      </div>

      {/* ------------display reated products -----------------------------*/}
      <RelatedProducts category={productData.category} Subcategory={productData.Subcategory}/>


    </div>
  ): <div className='opacity-0'></div>
}

export default Product