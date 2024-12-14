const Item = require("../model/items");
const User = require("../model/user");

const addItems = async (req, res) => {
    try {
        const { name, price, imageUrl, category, description, quantity } = req.body;
        const userId = req.user?._id;

        // Validate required fields
        if (!name || !price || !category || !description || !userId || !quantity) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user || user.role !== "Seller") {
            return res.status(403).json({ message: "Only sellers can add items." });
        }

        // Create a new item
        const newItem = new Item({
            name,
            price,
            imageUrl,
            category,
            quantity,
            description,
            createdBy: userId, 
        });

        console.log(userId, newItem);

        // Save the item to the database
        const savedItem = await newItem.save();

        // Add the item's ID to the user's addedItems array
        user.addedItems.push(savedItem._id); // Append the new item's ID
        await user.save();

        console.log(user);

        // Respond with the created item and updated user data
        res.status(201).json({
            message: "Item added successfully!",
            item: savedItem,
            addedItems: user.addedItems, // Return the full updated array
        });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({
            message: "Failed to add item.",
            error: error.message,
        });
    }
};

const getItems = async (req, res) => {
    try {
        const allItems = await Item.find({}).populate('createdBy', 'username');
        console.log(allItems);
        return res.json(allItems);
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ message: 'Error fetching items.' });
    }
};

const deleteItems = async (req, res) => {
    try {
        const { itemName } = req.body;

        // Find and delete the item
        const deletedItem = await Item.findOneAndDelete({ name: itemName });

        // Check if the item exists
        if (!deletedItem) {
            return res.status(404).json({ msg: "Item not found" });
        }

        return res.status(200).json({ msg: "Item deleted successfully", deletedItem });
    } catch (error) {
        console.error("Error deleting item:", error.message);
        return res.status(500).json({ msg: "Server error, unable to delete item" });
    }
};


module.exports = { addItems, getItems, deleteItems };
