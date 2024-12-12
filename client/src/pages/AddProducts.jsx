import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const AddProducts = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    // const [category, setCategory] = useState('');
    // const [description, setdescription] = useState('');

    const { name, setName,
        price, setPrice,
        imageUrl, setImageUrl,
        category, setCategory,
        description, setdescription, addItems } = useAppContext();

    const { userData } = useAppContext();
    console.log(userData?.role);

    const categories = [
        "Electronics",
        "Clothing",
        "Home Appliances",
        "Books",
        "Toys",
        "Other",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!name || !price || !category || !description) {
            alert("Please fill all required fields!");
            return;
        }

        if (!categories.includes(category)) {
            alert("Invalid category selected!");
            return;
        }

        const defaultImageUrl = "https://res.cloudinary.com/djrdw0sqz/image/upload/v1725100842/myImg_q3lyty.jpg";
        const payload = {
            name,
            price,
            imageUrl: imageUrl || defaultImageUrl,
            category,
            description,
        };

        try {
            const response = await axios.post(`${apiUrl}/api/item/add-items`, payload);
            console.log(response.data);
            alert('Product added successfully!');
            setName('');
            setPrice('');
            setImageUrl('');
            setCategory('');
            setdescription('');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };

    return (
        userData?.role === "Seller" ? (
            <div className="mt-20 text-black container">
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="border px-4 py-2 w-full"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Image URL:</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="border px-4 py-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="border px-4 py-2 w-full"
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            required
                            className="border px-4 py-2 w-full"
                            maxLength="500"
                        ></textarea>
                    </div>
                    <button
                        onClick={addItems}
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        ) : (
            <p className='text-3xl flex items-center justify-center'>You are not authorized to access the content of this page...</p>
        )
    );
};


export default AddProducts;
