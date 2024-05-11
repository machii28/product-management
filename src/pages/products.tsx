import {useEffect, useState} from "react";
import AddProduct from "@/component/AddProduct";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://product-management-api-production.up.railway.app/api/products');
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePurchase = async (productId: number) => {
    const quantity = prompt('Please enter the quantity of purchase');

    if (quantity === null) {
      return;
    }

    try {
      const response = await fetch(`https://product-management-api-production.up.railway.app/api/product/${productId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity: parseInt(quantity, 10)}),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to purchase product:', response.statusText);
      }
    } catch (error) {
      console.error('Error purchasing product:', error);
    }
  }

  const handleReturn = async (productId: number) => {
    const quantity = prompt('Please enter the quantity of return');

    if (quantity === null) {
      return;
    }

    try {
      const response = await fetch(`https://product-management-api-production.up.railway.app/api/product/${productId}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity: parseInt(quantity, 10)}),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to return product:', response.statusText);
      }
    } catch (error) {
      console.error('Error return product:', error);
    }
  }

  return (
    <div className="container mx-auto px-4">
      <AddProduct fetchProducts={fetchProducts}/>

      <div className="mt-20 px-4">
        <h1 className="text-3xl font-semibold mb-4">Products</h1>
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Quantity In Stock</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.quantity_in_stocks}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                      onClick={() => handlePurchase(product.id)}
                    >
                      Purchase
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleReturn(product.id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;