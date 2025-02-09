# BOOKME 📚✈️

## Introduction
**BOOKME** is a user-friendly mobile application designed to simplify booking and management tasks. It provides a seamless authentication system with user profile management, allowing users to sign up, log in, and maintain their personal details securely. Built with **React Native, Node.js, Express, and MongoDB Atlas**, BOOKME ensures a smooth and efficient experience for users.

## Features 🚀
- 🔐 **User Authentication** – Secure login/signup using JWT authentication.
- 🏠 **User Profile Management** – Users can update and manage their profile details.
- 📅 **Seamless Booking System** – An intuitive interface for users to book services easily.
- 📷 **Profile Photo Upload** – Users can upload profile pictures.
- 📍 **Address & Contact Management** – Users can save and update personal details.
- 🎨 **Modern UI/UX** – Built with **React Native** for a smooth user experience.

## Technologies Used 🛠️
### **Frontend**
- React Native
- Expo
- AsyncStorage
- React Navigation
- Axios
- Lottie Animations

### **Backend**
- Node.js
- Express.js
- MongoDB Atlas (Database)
- Mongoose (ODM for MongoDB)
- Bcrypt.js (Password Hashing)
- JSON Web Tokens (JWT for authentication)

## Installation & Setup ⚙️

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB Atlas** (or local MongoDB setup)
- **Expo CLI** (for React Native development)


### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/vidhaanviswas/CoDecode.git
   cd BOOKME/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app using Expo:
   ```bash
   npx expo start
   ```

## API Endpoints 🔗
| Method | Endpoint | Description |
|--------|------------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/profile/:username` | Fetch user profile |
| PUT | `/api/profile/update` | Update user profile |

## Prototypes 🎨
Here are some UI designs for BOOKME:

![image](https://github.com/user-attachments/assets/f8915659-d171-44e4-accb-1e283d809e1a)
![image](https://github.com/user-attachments/assets/8f85722d-1c90-4d09-99a4-6c934fa61cf4)
![image](https://github.com/user-attachments/assets/7397e2b7-e412-48d4-b307-fb02434f52ec)
![image](https://github.com/user-attachments/assets/d7e63d1f-4cf4-468b-aa59-e1d56f003a7a)

👥 Collaborators 🤝
We appreciate the efforts of everyone who contributed to the development of BOOKME.

- [Vidhaan Viswas](https://github.com/vidhaanviswas)
- [Sanath Shetty](https://github.com/sanathshetty777)
- [SAI MOURYA N D]()
- [SAIGANESH](https://github.com/SaiganeshShet)
- [SANJAY B](https://github.com/sanju530)
- [Shashank Kote](https://github.com/skote05)

If you'd like to contribute, feel free to submit a pull request or open an issue! 🚀

## Contact 📬
For any queries or support, reach out:
- 📧 **Email:** vidhaanviswas9204@gmail.com

Happy Coding! 🎉



