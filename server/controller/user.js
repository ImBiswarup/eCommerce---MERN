const User = require("../model/user");
const Item = require("../model/items");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupHandler = async (req, res) => {
  try {
    const { username, email, password, role, image } = req.body;

    // Check for missing fields
    if (!username || !email || !password || !role || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      image, // Use the Cloudinary URL provided in the request
      userCart: { wishlist: [], cart: [] },
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const payload = {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user?.role,
      imageUrl: user.userImageUrl,
      createdAt: user.createdAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    console.log(user);

    res.status(200).json({ user, message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



const addToCart = async (req, res) => {
  const { itemQuantity, cartItem } = req.body;

  console.log('cartItem: ', cartItem);

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the incoming request data
    console.log("Incoming addToCart request:");
    console.log("Item Quantity:", itemQuantity);
    console.log("Cart Item:", JSON.stringify(cartItem, null, 2)); // Pretty print the cartItem object

    // Validate item quantity
    if (!Number.isInteger(itemQuantity) || itemQuantity <= 0) {
      return res.status(400).json({ message: "Invalid item quantity." });
    }

    // Check if the item already exists in the user's cart
    const existingCartItem = user.userCart.cart.find(
      (item) => item.item.toString() === cartItem._id
    );

    if (existingCartItem) {
      // Update the quantity of the existing item
      existingCartItem.quantity += itemQuantity;
    } else {
      // Add the new item to the cart with quantity
      user.userCart.cart.push({ item: cartItem._id, quantity: itemQuantity });
    }

    // Mark the cart as modified
    user.markModified("userCart.cart");

    // Save the updated user data
    await user.save();

    res.status(200).json({
      message: "Item added to cart successfully.",
      cart: user.userCart.cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeFromCart = async (req, res) => {
  const { cartItemId } = req.body;
  console.log("Cart Item:", JSON.stringify(cartItemId, null, 2));
  console.log(cartItemId);

  if (!cartItemId) {
    return res.status(400).json({ message: "cartItemId is required." });
  }

  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the cart item by filtering out the matching item
    user.userCart.cart = user.userCart.cart.filter(
      (cart) => cart.item.toString() !== cartItemId // Convert `cart.item` to string for comparison
    );

    await user.save();

    res.status(200).json({
      message: "Item removed from cart successfully.",
      cart: user.userCart.cart, // Return the updated cart
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({})
  // console.log(allUsers);
  return res.json(allUsers);
};

const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).populate("userCart.cart.item");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ cart: user.userCart.cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getActualUser = async (req, res) => {
  try {
    console.log("Params received:", req.params);
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getActualUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllItems = async (req, res) => {
  const allItems = await Item.find({})
  // console.log(allItems);
  return res.json(allItems);
};




module.exports = { loginHandler, signupHandler, addToCart, removeFromCart, getAllUsers, getCartItems, getAllItems, getActualUser };
