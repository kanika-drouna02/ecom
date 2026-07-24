import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// --- CONFIGURE THESE TWO ---
const backendUrl = "http://localhost:4000"; // confirm this matches your server.js port
const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29tYWRtaW4xMjM.Vab9dV5NjGUcPSH1iFQcz7eJI-XZyn-mV-pYj6I1Bms";

// Path to the folder where your product images live (frontend assets folder)
const assetsPath = "../frontend/src/assets";

const products = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    category: "Women",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S","M","L"],
    
    images: [`${assetsPath}/p_img1.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Men",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["M","L","XL"],
    images: [`${assetsPath}/p_img2_1.png`, `${assetsPath}/p_img2_2.png`, `${assetsPath}/p_img2_3.png`, `${assetsPath}/p_img2_4.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S","L","XL"],
    images: [`${assetsPath}/p_img3.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    category: "Men",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S","M","XXL"],
    images: [`${assetsPath}/p_img4.png`]
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    category: "Women",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["M","L","XL"],
    images: [`${assetsPath}/p_img5.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: true,
    sizes: ["S","L","XL"],
    images: [`${assetsPath}/p_img6.png`]
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","L","XL"],
    images: [`${assetsPath}/p_img7.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img8.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["M","L","XL"],
    images: [`${assetsPath}/p_img9.png`]
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","L","XL"],
    images: [`${assetsPath}/p_img10.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L"],
    images: [`${assetsPath}/p_img11.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img12.png`]
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img13.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img14.png`]
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img15.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img16.png`]
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    category: "Men",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img17.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img18.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img19.png`]
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Women",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img20.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img21.png`]
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Women",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img22.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img23.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img24.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img25.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img26.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img27.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img28.png`]
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img29.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img30.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img31.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img32.png`]
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img33.png`]
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img34.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img35.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img36.png`]
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    category: "Women",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img37.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img38.png`]
  },
  {
    name: "Men Printed Plain Cotton Shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img39.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img40.png`]
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img41.png`]
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    category: "Kids",
    subCategory: "Topwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img42.png`]
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    category: "Kids",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img43.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img44.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img45.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img46.png`]
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    category: "Kids",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img47.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img48.png`]
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    category: "Kids",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img49.png`]
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    category: "Kids",
    subCategory: "Bottomwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img50.png`]
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    category: "Women",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img51.png`]
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    category: "Men",
    subCategory: "Winterwear",
    bestseller: false,
    sizes: ["S","M","L","XL"],
    images: [`${assetsPath}/p_img52.png`]
  },
];

async function uploadProduct(product) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("category", product.category);
  formData.append("subCategory", product.subCategory);
  formData.append("bestseller", String(product.bestseller));
  formData.append("sizes", JSON.stringify(product.sizes));

  product.images.forEach((imgPath, i) => {
    formData.append(`image${i + 1}`, fs.createReadStream(path.resolve(imgPath)));
  });

  try {
    const res = await axios.post(`${backendUrl}/api/product/add`, formData, {
      headers: { ...formData.getHeaders(), token }
    });
    console.log(product.name, "->", res.data.success ? "✅ added" : "❌ " + res.data.message);
  } catch (err) {
    if (err.response) {
      // server responded with an error status
      console.log(product.name, "-> ❌ server error:", err.response.status, JSON.stringify(err.response.data));
    } else if (err.request) {
      // request was made but no response received (crash, timeout, connection reset)
      console.log(product.name, "-> ❌ no response received:", err.code || err.message || err);
    } else {
      // something else went wrong (e.g. missing image file)
      console.log(product.name, "-> ❌ error:", err.message || err.code || err);
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  for (const p of products) {
    await uploadProduct(p);
    await delay(500); // small pause between uploads to avoid overloading server/Cloudinary
  }
  console.log("Done! Uploaded", products.length, "products.");
}

run();