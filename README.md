# Full-Stack Email Application

A full-stack email management application built with React, PHP, PostgreSQL, and Node.js, featuring JWT-based authentication and role-based access control (RBAC).

## 🚀 Features

- **User Authentication**: Secure JWT-based login system
- **Role-Based Access Control**: Admin and regular user roles with different permissions
- **Email Management**: Create, read, update, and delete email messages
- **Responsive UI**: Modern interface built with React and Tailwind CSS
- **Containerized**: Fully dockerized application for easy deployment
- **RESTful API**: PHP backend with proper authentication and authorization

## 🏗️ Architecture

The application consists of three main services:

- **Frontend**: React application with modern hooks and state management
- **Backend API**: PHP-based REST API with JWT verification
- **Authentication Service**: Node.js server handling user login and token generation
- **Database**: PostgreSQL for persistent data storage

## 📋 Prerequisites

- Docker
- Docker Compose
- Web browser

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Delvoie/Full-Stack-Email-Application.git
   cd Full-Stack-Email-Application
   ```

2. **Navigate to the docker directory**
   ```bash
   cd docker
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## 🔑 Authentication

### Default Users

Users are configured in `node/users.txt`. The file format is:
```
username:password:role
```

Example:
```
admin:admin123:admin
user1:password:user
```

### Roles

- **Admin**: Can view and manage all emails
- **User**: Can only view and manage their own emails

## 📁 Project Structure

```
Full-Stack-Email-Application/
├── codebase/
│   ├── classes/
│   │   └── Application/
│   │       ├── Database.class.php    # Database connection handler
│   │       ├── Mail.class.php        # Email model
│   │       ├── Page.class.php        # Page utilities
│   │       └── Verifier.class.php    # JWT verification
│   ├── html/
│   │   ├── index.html                # Main HTML file
│   │   ├── index.js                  # React app entry point
│   │   ├── Header.jsx                # Header component
│   │   ├── EmailList.jsx             # Email list component
│   │   ├── EmailDetail.jsx           # Email detail/compose component
│   │   └── api/
│   │       └── mail/
│   │           └── index.php         # Mail API endpoint
│   ├── sql/
│   │   └── 01-create.sql             # Database initialization
│   ├── composer.json                 # PHP dependencies
│   └── autoload.php                  # PHP class autoloader
├── docker/
│   ├── docker-compose.yml            # Docker orchestration
│   ├── Dockerfile                    # Web server container
│   ├── entrypoint.sh                 # Container startup script
│   └── my-apache-site.conf           # Apache configuration
├── node/
│   ├── Dockerfile                    # Node server container
│   ├── index.js                      # Authentication server
│   ├── package.json                  # Node dependencies
│   └── users.txt                     # User credentials
├── tailwind.config.js                # Tailwind CSS configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /node/login` - User login
  - Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "accessToken": "jwt_token" }`

### Mail API
All mail endpoints require authentication via Bearer token in the Authorization header.

- `GET /api/mail` - Get emails (user's own emails or all emails for admins)
  - Headers: `Authorization: Bearer <token>`
  
- `POST /api/mail` - Create new email
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "subject": "string", "body": "string" }`

## 🎨 Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Modern JavaScript (ES6+)

### Backend
- PHP with custom class autoloading
- Firebase JWT library
- PostgreSQL database

### Authentication Service
- Node.js
- Express.js
- jsonwebtoken

### DevOps
- Docker
- Docker Compose
- Apache HTTP Server

## 🔒 Security Features

- JWT-based stateless authentication
- Password verification
- Role-based access control
- User-scoped data access
- Secure token validation

## 🧪 Development

### Adding New Users

Edit `node/users.txt` and add users in the format:
```
username:password:role
```

### Modifying the Database

Edit `codebase/sql/01-create.sql` and rebuild the database container:
```bash
docker-compose down -v
docker-compose up -d
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server-web
docker-compose logs -f server-node
docker-compose logs -f server-postgres
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, modify the port mapping in `docker/docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 3000 to any available port
```

### Database Connection Issues
Ensure the PostgreSQL service is running:
```bash
docker-compose ps
```

### Authentication Failures
- Verify user credentials in `node/users.txt`
- Check Node.js service logs: `docker-compose logs server-node`

## 📝 License

This project is part of a learning assignment and is intended for educational purposes.

## 👤 Author

Delvoie

## 🙏 Acknowledgments

- Built as part of a full-stack web development course
- Uses Firebase PHP-JWT library for token handling
- AI assistance for specific UI components (documented in code comments)
