# 🏥 Hospital Management System

The **Hospital Management System** is a comprehensive web application designed to streamline various administrative and operational tasks within a hospital setting. This system facilitates efficient management of patient information, diet charts, meal preparation, and delivery tracking, ensuring seamless coordination between hospital food managers, pantry staff, and delivery personnel.

## 📋 Table of Contents

- [✨ Features](#-features)
  - [🧑‍⚕️ Hospital Food Manager](#-hospital-food-manager)
  - [👩‍🍳 Inner Pantry Staff](#-inner-pantry-staff)
  - [🚚 Delivery Personnel](#-delivery-personnel)
- [🛠️ Technologies Used](#-technologies-used)
- [⚙️ Installation](#-installation)
- [🚀 Usage](#-usage)
- [🤝 Contributors](#-contributors)
- [📄 License](#-license)

## ✨ Features

### 🧑‍⚕️ Hospital Food Manager

- **Manage Patient Details**: Add and update patient information, including name, diseases, allergies, room and bed numbers, contact information, and more.
- **Create Food/Diet Charts**: Develop personalized meal plans for patients, specifying ingredients and special instructions for morning, evening, and night meals.
- **Oversee Inner Pantry Operations**: Assign meal preparation and delivery tasks to pantry staff, monitor preparation statuses, and track meal deliveries to patient rooms.

### 👩‍🍳 Inner Pantry Staff

- **Manage Meal Preparations**: View assigned meal preparation tasks and update the preparation status for individual meals.
- **Coordinate Deliveries**: Assign specific meal boxes to delivery personnel and track the delivery status of each meal.

### 🚚 Delivery Personnel

- **Execute Meal Deliveries**: Access assigned meal boxes with patient and delivery details, mark deliveries as completed upon successful delivery to patient rooms, and add optional delivery notes.

## 🛠️ Technologies Used

- **Backend**: NestJS, Prisma, PostgreSQL
- **Frontend**: React.js, Material UI
- **Authentication**: JSON Web Tokens (JWT)

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/hospital-management-system.git
```

### Navigate to the Project Directory

```bash
cd hospital-management-system
```

### Install Backend Dependencies

```bash
npm install
```

### Navigate to the Frontend Directory

```bash
cd client
```

### Install Frontend Dependencies

```bash
npm install
```

### Set Up the Database

- Ensure PostgreSQL is installed and running.
- Create a new database named `hospital_management`.
- Configure the database connection in the backend configuration file.

### Run Database Migrations

```bash
npx prisma migrate deploy
```

### Start the Backend Server

```bash
npm run start:dev
```

### Start the Frontend Development Server

```bash
npm start
```

## 🚀 Usage

### Access the Application

- Open your web browser and navigate to `http://localhost:3000`.

### Log In Credentials (for testing)

- **Hospital Food Manager**:
  - Email: hospital_manager@xyz.com
  - Password: password123
- **Inner Pantry Staff**:
  - Email: pantry_staff@xyz.com
  - Password: password123
- **Delivery Personnel**:
  - Email: delivery_personnel@xyz.com
  - Password: password123

### Navigate the Dashboard

- Depending on your role, access the respective dashboard to manage patients, meals, and deliveries.

## 🤝 Contributors

- [Your Name](https://github.com/yourusername) - Full-Stack Developer

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Note: This project was developed as part of an assignment from [Heliverse](https://www.heliverse.com/assignment/hospital-food-management) to build a Hospital Food Delivery Management system.*
