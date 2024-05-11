import {ChangeEvent, FormEvent, JSX, useState} from "react";

const AddProduct  = ({fetchProducts}) => {
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    description: '',
    cost_of_good: '',
    selling_price: '',
    quantity_in_stocks: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddProduct(formData);

    setFormData({
      images: [],
      name: '',
      description: '',
      cost_of_good: '',
      selling_price: '',
      quantity_in_stocks: '',
    });
  }

  const onAddProduct = async (data: {
    selling_price: string;
    quantity_in_stocks: string;
    name: string;
    description: string;
    cost_of_good: string
  }) => {
    try {
      const response = await fetch('https://product-management-api-production.up.railway.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchProducts();
        console.log('test');
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost_of_good">
            Cost of Goods
          </label>
          <input
            type="number"
            id="cost_of_good"
            name="cost_of_good"
            value={formData.cost_of_good}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selling_price">
            Selling Price
          </label>
          <input
            type="number"
            id="selling_price"
            name="selling_price"
            value={formData.selling_price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity_in_stocks">
            Quantity in Stocks
          </label>
          <input
            type="number"
            id="quantity_in_stocks"
            name="quantity_in_stocks"
            value={formData.quantity_in_stocks}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;