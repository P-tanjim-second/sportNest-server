# Server

A Node.js Express server with MongoDB integration, JWT authentication, and CORS support.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_client_url
```

## Running the Server

Start the development server:
```bash
npm start
```

The server will run on the port specified in your `.env` file.

## Features

- **Express.js**: Fast and minimalist web framework
- **MongoDB**: NoSQL database integration
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment Variables**: Secure configuration with dotenv

## Dependencies

- `express` - Web framework
- `mongodb` - MongoDB driver
- `cors` - Cross-origin resource sharing middleware
- `dotenv` - Environment variable management
- `jsonwebtoken` - JWT creation and verification
- `better-auth` - Authentication utilities

## Deployment

This project is configured for deployment on Vercel. See `vercel.json` for configuration details.

## License

ISC
