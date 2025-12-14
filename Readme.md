Real Estate Property Listing & Management System
A full-stack web application built for the Programming for Information Systems (B9IS123) module.
 The system allows Admins, Agents, and Clients to manage property listings with full CRUD functionality.

Github Link
https://github.com/ashanhq/B9IS123_2526__CA2_Project


 Features

🧑‍💼 Agent
Add new property listings


Edit property details


Delete listings


View client inquiries




👤 Client (Public User)
View all available properties


Filter by location, type, bedrooms, and price


View property details with:


Image


Full description


Google Maps location


Contact Agent section


Submit inquiries



Technologies Used
Frontend
HTML5


CSS3


Vanilla JavaScript


Backend
Node.js


Express.js


REST API architecture


Database
MongoDB Atlas (Cloud DB)



📁 Project Structure
/realestate
│
├── frontend/
│   ├── index.html
│   ├── agent.html
│   ├── property.html
│   ├── styles.css
│   ├── script.js
│   ├── add.js
│   └── assets/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   └── propertyRoutes.js
│   ├── controllers/
│   │   └── propertyController.js
│   └── models/
│       └── Property.js
│
└── README.md


Core Functionalities
 CRUD Operations for Properties
The system allows users to create, read, update, and delete property listings:
Create (Add new property): Admins and Agents can add new properties with all relevant details like price, type, location, beds, baths, etc.


Read (View property): Admins, Agents, and Clients can view detailed information about properties.


Update (Edit property): Admins and Agents can update existing property listings to reflect any changes.


Delete (Remove property): Admins and Agents can delete a property listing from the system.


 Search and Filter
Users (Clients) can filter properties based on:
Location: Search for properties by city or neighborhood.


Type: Search properties by type (e.g., For Sale, For Rent).


Bedrooms: Filter by the number of bedrooms (1+, 2+, 3+).


Price Range: Filter by the price range.


Property Details Page
Each property has a detailed view that includes:
Property Image: A large image of the property.


Google Maps Embed: An embedded Google Maps location based on the property’s address.


Contact Agent Section: Agent's contact details (name, email, phone), allowing clients to reach out directly.



🚀 How to Run the Project
1. Install Dependencies
cd backend
npm install

2. Configure MongoDB
Create .env inside /backend:
MONGO_URI=your_mongodb_atlas_url
PORT=5000

3. Start Backend
node server.js

4. Open Frontend
Open index.html in your browser.

 API Endpoints (REST)
Method
Endpoint
Description
GET
/api/properties
Get all properties
GET
/api/properties/:id
Get one property
POST
/api/properties
Add new property
PUT
/api/properties/:id
Update property
DELETE
/api/properties/:id
Delete property


📝 Acknowledgement
This project was developed as part of the Programming for Information Systems (B9IS123) module.
 Some parts of the implementation were supported using Online resources You tube Stack overflow and ChatGPT for explanations and guidance.
 Contact
If you have questions or want help improving the project:
Developer: R M Ashan Maduwantha
Email: ashanmaduwantha270@gmail.com
