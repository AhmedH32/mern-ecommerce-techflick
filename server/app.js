const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem'); // Ensure this model is defined

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // This middleware is crucial for req.body to be parsed

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Connected to Atlas!'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('TechFlick API is running!');
});

app.get('/api/products/category/:categoryName', async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await Product.find({ category: categoryName });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Server Error fetching products by category' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Server Error fetching product by ID' });
    }
});

app.get('/api/featured_products', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(5);
        res.json(featuredProducts);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ message: 'Server Error fetching featured products' });
    }
});

// --- User Authentication Routes Start ---

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password, name } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ message: 'Server error during sign up' });
    }
});

app.post('/api/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ message: 'Server error during sign in' });
    }
});

// --- User Authentication Routes End ---

// --- Cart Routes Start ---

// A simple middleware to ensure userId is present for cart operations.
// This version is more robust against undefined req.body, req.params, or req.query.
const verifyUser = (req, res, next) => {
    // Ensure req.body, req.params, req.query are treated as objects,
    // even if they happen to be undefined initially.
    const body = req.body || {};
    const params = req.params || {};
    const query = req.query || {};

    if (!body.userId && !params.userId && !query.userId) {
        return res.status(401).json({ message: 'User ID is required for this operation.' });
    }
    next();
};

app.post('/api/cart', verifyUser, async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid cart item data: userId, productId, and a positive quantity are required.' });
        }

        let cartItem = await CartItem.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            const newCartItem = new CartItem({
                user: userId,
                product: productId,
                quantity: quantity,
            });
            await newCartItem.save();
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error('Error adding/updating cart item:', error);
        res.status(500).json({ message: 'Server error adding/updating cart item.' });
    }
});

app.get('/api/cart/:userId', verifyUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await CartItem.find({ user: userId }).populate('product');
        const validCartItems = cartItems.filter(item => item.product !== null);

        res.status(200).json(validCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server error fetching cart items.' });
    }
});

app.patch('/api/cart/:cartItemId', verifyUser, async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId;
        const { quantity, userId } = req.body;

        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be a positive number.' });
        }

        const cartItem = await CartItem.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        if (cartItem.user.toString() !== userId) {
             return res.status(403).json({ message: 'Unauthorized: You do not own this cart item.' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);

    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Server error updating cart item quantity.' });
    }
});

app.delete('/api/cart/:cartItemId', verifyUser, async (req, res) => {
    try {
        const cartItemId = req.params.cartItemId;
        const { userId } = req.body;

        const cartItem = await CartItem.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        if (cartItem.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this cart item.' });
        }

        await CartItem.findByIdAndDelete(cartItemId);
        res.status(200).json({ message: 'Cart item removed successfully.' });

    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Server error removing cart item.' });
    }
});

// --- Cart Routes End ---

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});