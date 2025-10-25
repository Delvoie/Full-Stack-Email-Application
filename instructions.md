**Assignment 3 (Final - Revised)**

---

### Overview

Use a Node server to update your corporate Mail application to handle user accounts, authentication, and role-based access control (RBAC). This assignment reinforces concepts of stateless authentication, scoped access, and scalable service design across multiple technologies.

---

### Requirements

#### 1. **Authentication**
️- Modify the Node `index.js` file to check the `users.txt` file and handle login.
️- On successful login, issue a **JWT access token**:
️- An **access token** that includes the user's `userId` and `role`.
️- Store token on the client. Use to authorize future requests by placing it in the header of the request.
️- The header should look like { Authorization: `Bearer ${access_token}` }

#### 2. **Client Application Responsibilities**
️- Create a login form with fields `username` and `password`.
- Store access token in state.
- Update fetch requests to include the access token.
- Implement logout to clear tokens and reset the application state.

#### 3. **Role-Based Access Control (RBAC)**
- Extend `users.txt` to include a `role` field (e.g., `admin`, `user`).
- Include the `role` in the JWT payload.
- In the PHP backend:
  - Use the Verifier class to decode the JWT and access both `userId` and `role`.
  - Allow users to access only their own records unless their role is `admin`.

#### 4. **PHP API Integration**
- Modify the PHP API to use the `Verifier` class (via autoload) and extract the `userId` and `role`.
- Scope mail data to the authenticated user:
  - Admins (`role === 'admin'`) can view all mail.
  - Regular users may only see their own.
- You are required to implement **GET** and **POST** endpoints only. There is no requirement for PUT or DELETE.

> Note: The backend uses a simple database schema that has been modified to support user scoping. You are not responsible for modifying the storage layer beyond RBAC logic.

---

### Getting Started

Unzip `assignment-three-start.zip` into your project folder.

From the `/docker` directory, run:

```bash
docker-compose build && docker-compose up -d
```

The first time the container starts, it will automatically install PHP dependencies using `composer install`.

To manually inspect the web container:

```bash
docker exec -it docker-server-web-1 /bin/bash
```

To test the Node login endpoint using curl:

```bash
curl -d '{"username":"user1", "password":"12345"}' \
     -H "Content-Type: application/json" \
     -X POST http://localhost/node/login
```

You should see an appropriate error or a valid token response.

---

### Comprehension Check

Why can’t we use cURL from the Command Prompt to interact with our Node server?

**Answer:** Our Docker configuration only exposes the Apache server. Node is installed behind Apache and is not directly accessible from our laptop environment.

---

### Submission

Zip your finished application and upload it to the DC Connect drop box before the due date.

---

### Rubric (/20)

| Component                              | Marks |
|----------------------------------------|-------|
| Node auth (access)                     | /5    |
| Client login + token persistence       | /5    |
| Fetch requests with access token       | /2    |
| PHP Verifier usage + token decoding    | /3    |
| RBAC logic (client + server)           | /3    |
| User-scoped data                       | /2    |
| **Total**                              | **/20** |

---

**PENALTIES**

- -1 if the JWT secret is not changed to a random string
- -2 if the Verifier class is not autoloaded correctly
- -5 for late submission
- -20 if submitted after the late window (assignment will not be graded)

