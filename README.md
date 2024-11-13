# CoverUp Project - README

## Project Overview

**CoverUp** is a comprehensive full-stack application designed to streamline the process of managing funeral parlors. It offers a smooth and user-friendly interface for clients to input their ID, confirm their details, and select policies, while the admin system facilitates the management of policies, clients, and parlors.

The app is developed using **Next.js** for both the frontend and backend, featuring a responsive UI powered by **Tailwind CSS** and **SASS** for styling. Backend functionalities include automatic extraction of user details from their ID number and address autocompletion using **Google Maps API**.

The app is currently deployed on **CodeSandbox** for live testing and easy access.

---

## Key Features

1. **Landing Page**: The project starts with a visually appealing and SEO-friendly landing page designed to attract users and provide key information about the services.

2. **Admin Login**: The admin is already registered, and the credentials are provided with the system. Admin login is securely handled using **jsonwebtoken** for token-based authentication, enabling admins to manage the system.

3. **ID Verification**: Clients input their ID number, and the system automatically extracts their date of birth. On the following page, clients are prompted to confirm their details by manually entering their name.

4. **Profile Management**: Clients can manage their profile information, while admins have full access to manage and update user profiles.

5. **Policy Selection**: Clients can select different insurance policies, customize extra options, and manage their choices from a dedicated policy management interface.

6. **Funeral Parlors Management**: The admin system allows managing multiple funeral parlors, their services, and associated clients. **Redux** is used to store parlors and related information for adding, editing, deleting, and saving the parlors.

7. **Form Validation**: **React Hook Form** is used for efficient form validation across the application.

8. **Address Autocomplete**: Powered by the **Google Maps API** for ease of address input.

9. **Email Contact Form**: Users can send inquiries via the contact page, which utilizes **Nodemailer** to send emails. Success and error messages are displayed using **React Toastify**.

10. **Data Security**: **bcrypt** is used to securely hash sensitive data such as passwords.

---

## Technologies Used

- **Next.js**: Used for both frontend and backend functionality, allowing for seamless API integration and server-side rendering.
- **Tailwind CSS** and **SASS**: For dynamic styling and responsive design.
- **React Hook Form**: For form validation.
- **Redux**: For managing state related to parlors and their services.
- **Axios**: For handling HTTP requests.
- **React Toastify**: For displaying success and error messages.
- **React Select**: For enhanced select dropdown functionality.
- **jsonwebtoken**: For token-based admin authentication.
- **bcrypt**: For hashing sensitive data like passwords.
- **Nodemailer**: For sending emails via the contact form.
- **Google Maps API**: For address autocomplete functionality.
- **MySQL**: Will be used in the future to store parlors' and clients' information.

---

## Phase 2 Features

1. **Payment System**: The payment system is planned for phase 2 and will handle secure policy payments via an integrated payment gateway.

2. **VerifyID API Integration**: Future integration with **VerifyID API** will allow for enhanced ID verification capabilities, adding a layer of security and convenience.

3. **MySQL Integration**: MySQL will be used to store parlors' and clients' information in future phases.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14+ recommended).
- **Google Maps API**: Obtain credentials for the Google Maps API.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GMNT-Holdings/cover-up.git

   ```

2. **Navigate to the project directory**:
   cd coverup

3. **Install dependencies**:
   npm install

4. **Set up environment variables**:
   Create a .env file at the root of your project and configure the following variables:

GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>

JWT_SECRET=<your-secret-key-for-jwt>

5. **Run the application**:
   npm run dev

   The app should now be running on http://localhost:3000.

**Deployed Version**
The application is currently deployed and available for live testing on CodeSandbox. You can access the deployed version here: https://whzlrh-3000.csb.app/
