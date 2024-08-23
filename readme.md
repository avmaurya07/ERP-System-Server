# College ERP System Server

This repository contains the server-side implementation of a College ERP system. The ERP system is designed to manage and streamline various academic processes within a college, providing dedicated functionalities for admins, students, and teachers.

## Features

### Admin
- **(Details will be updated later)**

### Teacher
- **Lecture Management**: View and manage scheduled lectures.
- **Attendance**: Mark and track student attendance.
- **Grades and Assignments**: Update and manage student marks and assignments.
- **Course Content**: Manage and upload course materials and resources.

### Student
- **Attendance Tracking**: Check attendance records.
- **Timetable**: View scheduled lectures (timetable).
- **Grades**: Access marks and performance in assignments.
- **Assignments**: Track and submit assignments.

## Project Structure

```plaintext
erp-system/
│
├── middeleware/
│   ├── fetchadmin.js
│   └── fetchuser.js
├── modals/
│   ├── logs/
│   │   └── logs.js
│   └── users/
│       ├── AdminUser.js
│       ├── StudentUser.js
│       └── TeacherUser.js
├── routes/
│   ├── auth/
│   │   ├── changepassword.js
│   │   ├── createuser.js
│   │   ├── login.js
│   │   └── masterlogin.js
│   ├── logs/
│   │   └── logs.js
│   └── user/
│       └── userlist.js
├── .env
├── db.js
├── index.js
├── package-lock.json
└── package.json
```
