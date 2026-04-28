const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  console.log("DB Connected for seeding...");

  // ⚠️ OLD DATA DELETE (optional)
  await Product.deleteMany();

  const products = [
    {
      name: "Rice 1kg",
      price: 60,
      description: "Premium Basmati Rice",
      category: "Grocery",
      stock: 50,
      image: "https://5.imimg.com/data5/SELLER/Default/2022/11/ZA/YH/RE/162086704/india-gate-select-basmati-rice-500x500.png"
    },
    {
      name: "Milk",
      price: 50,
      description: "Fresh milk",
      category: "Dairy",
      stock: 20,
      image: "https://imgs.search.brave.com/btlwfBN11nZczmid_gvH7HVW4-aQ-kqqHFnseYnSIhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODEyODE2TCtIa0wu/anBn"
    },
    {
      name: "Eggs",
      price: 80,
      description: "Farm fresh eggs",
      category: "Dairy",
      stock: 30,
      image: "https://imgs.search.brave.com/o5Uus6DE0enswxfn8iC1eNQxD2fp4NMh5TqgIfHopGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG9wY2hvcC5pbi9z/dG9yYWdlL3Byb2R1/Y3RzL0ZlYnJ1YXJ5/MjAyMi9Yd050NThn/VmtvTktQQ05WQ3pQ/RC53ZWJw"
    },
    {
      name: "Bread",
      price: 40,
      description: "Soft bread loaf",
      category: "Bakery",
      stock: 15,
      image: "https://imgs.search.brave.com/-NK0xkzhKOr622XM9L-D6y3wAZMYKK9_Vwyo4s8CDEg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bW9yZWlzaGZvb2Rz/LmNvbS9pbWFnZXMv/aG9tZV9iYW5uZXIt/MS5qcGc"
    },
    {
      name: "Biscuits",
      price: 30,
      description: "Crunchy biscuits",
      category: "Snacks",
      stock: 25,
      image: "https://imgs.search.brave.com/eY2HjTxw2nlgkLhIMNwLd3njr0Jbq6JiguCQUS3FiNY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTE2OE5NZyszc0wu/anBn"
    },
    {
      name: "Apples",
      price: 120,
      description: "Fresh red apples",
      category: "Fruits",
      stock: 50,
      image: "https://imgs.search.brave.com/pw-jcnUxYP37fNVjsBRBzSS0erpb1U3IsS3aFnDqNVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDgz/MTE3MTg5L3Bob3Rv/L2dyZWVuLWFuZC1y/ZWQtYXBwbGVzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1z/djhoWDJfUHVMTHhu/MkRXdW9ib0YyQjBw/VU9MLVE0Tjdnd0dz/cWo3T1k4PQ"
    },
    {
      name: "Chocolates",
      price: 150,
      description: "Sweet chocolates",
      category: "Snacks",
      stock: 40,
      image: "https://imgs.search.brave.com/thgMCNX9iwjhUp3xPd4KNzalc-95miliScNsQS63tIQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF3Tmtwc0lCRkwu/anBn"
    },
    {
  name: "Bananas",
  price: 60,
  description: "Fresh bananas",
  category: "Fruits",
  stock: 40,
  image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS7_0hFtgMvPxb10iC-9JJs82Lkf-96zPDXSIBHnrFtFGbYoxSdBD3QpR85aAEccP1ME0KY240szUenQG5HKoW-nV8QOSu"
},
{
  name: "Potatoes",
  price: 30,
  description: "Fresh potatoes",
  category: "Vegetables",
  stock: 100,
  image: "https://imgs.search.brave.com/nlGFBEIt8Suh1B2Bh0RmLPCNyQg0yfiM_L44rl7EcEo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzg0LzE0Lzg3/LzM2MF9GXzEyODQx/NDg3NDRfckV2M2pP/NWNQTGlPWXBFbUNr/ZWRTa1J4dFZ1WUo4/dVEuanBn"
},
{
  name: "Onions",
  price: 35,
  description: "Fresh onions",
  category: "Vegetables",
  stock: 80,
  image: "https://imgs.search.brave.com/crDbGi0zmtiZqx0-Ycsyeu56OeCg_cYTDO0p11e_8jY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzMxLzE0LzE0/LzM2MF9GXzEzMTE0/MTQ1MV9LSklvYTFq/b3RTTDRFY0gxOWtx/a3VpbmZveHZBOWFz/Si5qcGc"
},
{
  name: "Tomatoes",
  price: 40,
  description: "Fresh tomatoes",
  category: "Vegetables",
  stock: 70,
  image: "https://imgs.search.brave.com/veZItDc1KFubALjaLlW0a_y4L605I6ztkbT5pC4P-Vw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzA0LzkxLzU3/LzM2MF9GXzgwNDkx/NTc2NV9HNEFnQXc3/eU42U2xKZ3dMTWwy/c0xQeFc2NEFLcWZO/Yi5qcGc"
},
{
  name: "Salt",
  price: 20,
  description: "Iodized salt",
  category: "Grocery",
  stock: 200,
  image: "https://imgs.search.brave.com/aMSYvikYQtBxZLur9cdR70vg6Hmcd8DiBTpo6tvR0Dg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aWlt/Zy50aXN0YXRpYy5j/b20vZnAvMS8wMDcv/NTYwL2xvdy1pbi1z/b2RpdW0tYW5kLWhp/Z2gtaW4tY2FsY2l1/bS1uYXR1cmFsLXRh/c3RlLXdoaXRlLWVk/aWJsZS10YXRhLXNh/bHQtNTc0LmpwZw"
},
{
  name: "Sugar",
  price: 45,
  description: "Refined sugar",
  category: "Grocery",
  stock: 150,
  image: "https://imgs.search.brave.com/gcKzk0DPdOeOcD2g6Z967DVgSeVr6kBjsBtK8QuoAlM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9pbWFnZS1m/dWxsLXN0YWNrZWQt/c3VnYXItY3ViZXMt/MjYwbnctMjQ5OTcz/Mjg4Ny5qcGc"
},
{
  name: "Cooking Oil",
  price: 180,
  description: "Refined cooking oil",
  category: "Grocery",
  stock: 60,
  image: "https://imgs.search.brave.com/vEeP4EPddeHjrQL3bunyoDo0ASk4OLl2yQKXuF6U75o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTcv/NjAxLzAyNi9zbWFs/bC92ZWdldGFibGUt/b2lsLWdsYXNzLWJv/dHRsZS1pc29sYXRl/ZC1vbi13aGl0ZS1i/YWNrZ3JvdW5kLXdp/dGgtY2xpcHBpbmct/cGF0aC1vcmdhbmlj/LWhlYWx0aHktZm9v/ZC1mb3ItY29va2lu/Zy1waG90by5qcGc"
},
{
  name: "Tea",
  price: 120,
  description: "Premium tea leaves",
  category: "Beverages",
  stock: 50,
  image: "https://imgs.search.brave.com/-IwvhQSwD7LzN2RCgJ_Xf_FB59fl3Vso1_Serw5MLWI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIveGlm/MHEvdGVhL2Ivbi9q/LzUwMC1wcmVtaXVt/LWxlYWYtMS1wb3Vj/aC1yZWd1bGFyLXRl/YS10YXRhLWxlYXZl/cy1ncmFudWxlcy1v/cmlnaW5hbC1pbWFo/ZHhqa2dod3NjaHJk/LmpwZWc_cT03MA"
},
{
  name: "Coffee",
  price: 200,
  description: "Instant coffee powder",
  category: "Beverages",
  stock: 40,
  image: "https://imgs.search.brave.com/OmwqqjRcazNO5IIPOe3M3PGJu84uuBFXurWp2aGv4zk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmVzY2FmZS5jb20v/aW4vc2l0ZXMvZGVm/YXVsdC9maWxlcy8y/MDI1LTA2L0luZGlh/X1JhbmdlX05FU0NB/RkVDbGFzc2ljXzEw/NjZ4NjMwXzEuanBn"
},
{
  name: "Butter",
  price: 90,
  description: "Creamy butter",
  category: "Dairy",
  stock: 35,
  image: "https://imgs.search.brave.com/g2gOREOTht33whxJR1n9dHOvmoBvs6J5psCU9GJA-l0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUzL2M5/Lzk4LzUzYzk5OGVk/ZWVkNTFjN2U1MGVh/MWJkNjllZGUwNGQx/LmpwZw"
}
  ];

  // ✅ INSERT ALL PRODUCTS
  await Product.insertMany(products);

  console.log("🔥 All Products Inserted Successfully");

  process.exit();

})
.catch(err => {
  console.log("❌ Error:", err);
});