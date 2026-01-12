LIVE PROJECT : https://mern-project-lovat-gamma.vercel.app/

### RentEase - Rent and Return Marketplace
## Overview

RentEase is a comprehensive online platform that enables users to rent and list items for rent. The platform facilitates peer-to-peer renting of various items including electronics, furniture, books, tools, cameras, vehicles, computers, and clothing. RentEase aims to promote a sharing economy by allowing people to monetize their unused items and providing others with affordable access to items they need temporarily.

## Features

# For Renters

- **Browse Items**: Explore a wide range of items available for rent
- **Search & Filter**: Find items by category, location, or keyword
- **Location-Based Search**: Discover items available near you
- **Detailed Item Views**: View comprehensive information about each item
- **Secure Booking**: Book items for specific dates with secure payment options
- **Reviews & Ratings**: Read and write reviews for items
- **Chat System**: Communicate directly with item owners
- **Cart Management**: Add multiple items to cart and manage rental duration


# For Item Owners

- **List Items**: Easily list your items for rent with detailed descriptions
- **Set Pricing**: Define your own daily rental rates and security deposits
- **Manage Listings**: Update or remove your listings as needed
- **Track Rentals**: Keep track of who is renting your items
- **Receive Reviews**: Build reputation through customer reviews
- **Chat with Renters**: Communicate with potential renters


### General Features

- **User Authentication**: Secure login and signup system
- **User Profiles**: Personalized profiles with rental history
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **EMI Calculator**: Calculate monthly payments for higher-value rentals
- **Notification System**: Stay updated with rental status and messages


## Technologies Used
# Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons


# Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt for password hashing


# State Management

- React Context API
- Custom hooks


### UI/UX

- Responsive design
- Toast notifications
- Modal dialogs
- Form validation


## Installation and Setup

# Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)


### Frontend Setup

1. Clone the repository


```shellscript
git clone https://github.com/yourusername/rentease.git
cd rentease
```

2. Install dependencies


```shellscript
npm install
# or
yarn install
```

3. Run the development server


```shellscript
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application


### Backend Setup

1. Navigate to the backend directory


```shellscript
cd backend
```

2. Install backend dependencies


```shellscript
npm install
# or
yarn install
```

3. Create a `.env` file in the backend directory with the following variables:


```plaintext
MONGODB_URI=mongodb://localhost:27017/rentease
# or your MongoDB Atlas connection string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server


```shellscript
# Development mode with auto-restart
npm run dev
# or
yarn dev

# Production mode
npm start
# or
yarn start
```

5. The backend API will be available at [http://localhost:5000](http://localhost:5000)


### Running Both Frontend and Backend

You can use a tool like concurrently to run both servers simultaneously:

1. Install concurrently in the root directory


```shellscript
npm install --save-dev concurrently
# or
yarn add --dev concurrently
```

2. Add the following script to the root `package.json`:


```json
"scripts": {
  "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
  "dev:frontend": "next dev",
  "dev:backend": "cd backend && npm run dev"
}
```

3. Run both servers with a single command


```shellscript
npm run dev
# or
yarn dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user


### Items

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item
- `POST /api/items` - Create a new item (requires authentication)
- `PUT /api/items/:id` - Update an item (requires authentication)
- `DELETE /api/items/:id` - Delete an item (requires authentication)


### User

- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)


### Reviews

- `GET /api/reviews/:itemId` - Get reviews for an item
- `POST /api/reviews/:itemId` - Create a review for an item (requires authentication)


## Project Structure

```plaintext
rentease/
├── app/                    # Next.js App Router pages
│   ├── about/              # About us page
│   ├── cart/               # Shopping cart page
│   ├── category/           # Category pages
│   ├── chats/              # Chat system pages
│   ├── checkout/           # Checkout process
│   ├── contact/            # Contact us page
│   ├── faq/                # FAQ page
│   ├── how-it-works/       # How it works page
│   ├── items/              # Item listings and details
│   ├── list-item/          # Item listing form
│   ├── login/              # Login page
│   ├── nearby-items/       # Location-based items
│   ├── preview/            # Demo preview page
│   ├── profile/            # User profile page
│   ├── search/             # Search results page
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── ui/                 # UI components (shadcn)
│   └── ...                 # Other components
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication context
│   ├── CartContext.tsx     # Shopping cart context
│   └── ToastContext.tsx    # Toast notifications context
├── data/                   # Mock data and data utilities
│   ├── allItems.ts         # Item catalog data
│   └── reviews.ts          # Review system data
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
├── backend/                # Backend code
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── controllers/        # Route controllers
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Database Schema

### User

```plaintext
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Item

```plaintext
{
  _id: ObjectId,
  name: String,
  description: String,
  category: String,
  price: Number,
  securityDeposit: Number,
  image: String (URL),
  owner: ObjectId (ref: User),
  city: String,
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Review

```plaintext
{
  _id: ObjectId,
  itemId: ObjectId (ref: Item),
  userId: ObjectId (ref: User),
  rating: Number,
  comment: String,
  date: Date
}
```

## Usage Examples

### Browsing Items

Navigate to the homepage or categories to browse available items. Use filters to narrow down your search by category, price range, or location.

### Renting an Item

1. Find an item you want to rent
2. View item details and availability
3. Add the item to your cart
4. Specify rental duration
5. Proceed to checkout
6. Complete payment
7. Arrange pickup or delivery with the owner


### Listing an Item

1. Navigate to "List Your Item"
2. Fill in item details (name, description, category)
3. Set rental price and security deposit
4. Upload photos of your item
5. Submit your listing


## Future Enhancements

- **Payment Gateway Integration**: Implement secure payment processing
- **Advanced Search Filters**: Add more filtering options for better search results
- **Wishlist Feature**: Allow users to save items for later
- **Rental Insurance**: Offer insurance options for high-value items
- **Mobile App**: Develop native mobile applications for iOS and Android
- **AI-Powered Recommendations**: Implement recommendation system based on user preferences
- **Subscription Model**: Introduce subscription plans for frequent renters


## Contributing

We welcome contributions to RentEase! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to us at opmovies143@gmail.com

---

© 2025 RentEase. All rights reserved.
