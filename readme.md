# College ERP System Server

This repository contains the server-side implementation of the College ERP (Enterprise Resource Planning) system. The ERP system is designed to manage and streamline various academic processes within a college, providing dedicated functionalities for admins, coordinators, teachers, and students.

## Client

##### [Click here to go to Client Repository](https://github.com/avmaurya07/ERP-System-Client)

## Features

### Admin

The Admin role in the ERP system offers comprehensive control and management capabilities. Key features include:

- **User Management**
  - View and manage students, teachers, and other admins.
  - Add all types of users to the system.
  - Import students in bulk using a CSV file.
  - Assign the coordinator role to any existing user.
  - Define specific roles and responsibilities for coordinators.

- **Login Access**
  - Directly log in to student and teacher panels for supervision or support.

- **Institutional Management**
  - Manage schools and departments by viewing existing entries and adding new ones.

- **Academic Year and Semester Management**
  - Oversee academic years and semesters, with options to view and add new entries.

- **Batch Management**
  - View existing batches, add new batches, and edit student details within a specific batch.

- **Course and Class Management**
  - Manage courses by viewing and adding them to the system.
  - Manage classes on a batch-wise basis, with options to view and add new classes.

### Coordinator

Coordinators manage specific academic tasks within their assigned department. Their features include:

- **Timetable Management**
  - Schedule classes for students within their department.

- **Departmental Management**
  - Manage batches, courses, and classes, but only within their department.

- **Role-Specific Permissions**
  - Coordinators can perform these actions only if they have been granted the necessary permissions for their role.

### Teacher

Teachers have access to features that help them manage their courses and interact with students:

- **Courses**
  - View the batches assigned to them along with the student list.

- **Lecture Management**
  - View scheduled lectures and arrange for alternates if necessary.

- **Attendance**
  - Mark and track student attendance.

### Student

Students can interact with their academic information through these features:

- **Check Timetable**
  - View the week-wise timetable.

- **Course Enrollment**
  - Check enrolled courses.

- **Change Password**
  - Update their account password.

## API Endpoints

The server provides various API endpoints to interact with the system. These endpoints allow the client application to perform CRUD operations on users, batches, courses, and more.


##### Endpoints will be updated in detail.....
<!-- ### Authentication

- **POST** `/api/auth/login`: Authenticate a user and return a JWT token.
- **POST** `/api/auth/register`: Register a new user (admin, teacher, student).

### User Management

- **GET** `/api/users`: Retrieve a list of users.
- **POST** `/api/users`: Add a new user.
- **PUT** `/api/users/:id`: Update user details.
- **DELETE** `/api/users/:id`: Delete a user.

### Timetable Management

- **GET** `/api/timetable`: Retrieve the timetable for a specific batch or department.
- **POST** `/api/timetable`: Schedule a new class.
- **PUT** `/api/timetable/:id`: Update a scheduled class.
- **DELETE** `/api/timetable/:id`: Delete a scheduled class.

### Academic Management

- **GET** `/api/academic`: Retrieve academic years and semesters.
- **POST** `/api/academic`: Add a new academic year or semester.
- **PUT** `/api/academic/:id`: Update academic year or semester details.
- **DELETE** `/api/academic/:id`: Delete an academic year or semester.

### Batch Management

- **GET** `/api/batches`: Retrieve a list of batches.
- **POST** `/api/batches`: Add a new batch.
- **PUT** `/api/batches/:id`: Update batch details.
- **DELETE** `/api/batches/:id`: Delete a batch.

### Course Management

- **GET** `/api/courses`: Retrieve a list of courses.
- **POST** `/api/courses`: Add a new course.
- **PUT** `/api/courses/:id`: Update course details.
- **DELETE** `/api/courses/:id`: Delete a course. -->

# Versions 0.9.0