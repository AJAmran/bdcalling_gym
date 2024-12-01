# **BDcalling Gym Management System**

## **Project Overview**
The Gym Management System is a robust platform that helps administrators, trainers, and trainees manage gym operations efficiently. It includes features like class scheduling, user role-based authentication, and enrollment in classes, offering a streamlined user experience.

---

## **Relational Diagram**
A relational diagram represents the relationship between users, classes, and enrollments in the system.

![Relational Diagram](https://res.cloudinary.com/dhukcjdmi/image/upload/v1733051652/er_diagram_yrpt0f.png)  


---

## **Technology Stack**
The following technologies were used to build this project:

- **Backend Framework:** Express.js
- **Programming Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Other Libraries:**
  - bcryptjs
  - dotenv
  - express-validator
  - mongoose
- **Tools:**
  - Postman for API testing
  - Git for version control
  - VS Code for development

---

## **API Endpoints**
### **Authentication**
| Method | Endpoint         | Description                | Authorization | Body/Params                                                                                  |
|--------|-------------------|----------------------------|---------------|---------------------------------------------------------------------------------------------|
| POST   | `/api/auth/login` | Login to the system        | None          | `{ email: string, password: string }`                                                      |

### **User Management**
| Method | Endpoint              | Description                     | Authorization         | Body/Params                                                                                  |
|--------|------------------------|---------------------------------|-----------------------|---------------------------------------------------------------------------------------------|
| POST   | `/api/users/register` | Register a new user             | None                  | `{ fullName, email, password, role }`                                                       |
| GET    | `/api/users`          | Get all users                   | Admin                 | None                                                                                        |

### **Class Management**
| Method | Endpoint                | Description                     | Authorization         | Body/Params                                                                                  |
|--------|--------------------------|---------------------------------|-----------------------|---------------------------------------------------------------------------------------------|
| POST   | `/api/classes`          | Create a new class              | Admin                 | `{ date, time, trainer }`                                                                   |
| GET    | `/api/classes`          | Fetch all classes               | Admin/Trainer         | None                                                                                        |
| PATCH  | `/api/classes/enroll/:id` | Enroll trainee in a class       | Trainee               | `Class ID as :id`                                                                           |

---

## **Database Schema**

### **User**
```typescript
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trainer", "trainee"], default: "trainee" },
});
```

### **Class**
```typescript
const classSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  maxTrainees: { type: Number, default: 10 },
});
```

---

## **Admin Credentials**
- **Email:** `amran@example.com`
- **Password:** `password123`

---

## **Instructions to Run Locally**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/AJAmran/bdcalling_gym.git
   cd your-repo-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your Secret Key>
   ```

4. **Start the Server**
   ```bash
   npm run dev
   ```

5. **API Testing**
   Use Postman or any API testing tool to test endpoints. 

---

## **Live Hosting Link**
[Live Demo](https://gym-backend-lake.vercel.app/)

