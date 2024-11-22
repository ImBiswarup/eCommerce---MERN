const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



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
            imageUrl: user.userImageUrl,
            createdAt: user.createdAt,
            userCart: user.userCart,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        user.token = token;
        await user.save();

        res.status(200).json({ user, message: "Login successful.", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



const signupHandler = async (req, res) => {
    try {
        const { username, email, password, userImageUrl } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userImageUrl,
            userCart: { wishlist: [], cart: [] },
        });

        await newUser.save();

        console.log(newUser);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { loginHandler, signupHandler };
