# Quantico Car Rental Services Backend API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
All protected routes require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Get JWT Token
```http
POST /api/admins/login
Content-Type: application/json

Request Body:
{
    "username": "string",
    "password": "string"
}

Response:
{
    "message": "Login successful",
    "token": "jwt_token_string"
}
```

## Services API

### Create Service
```http
POST /api/services
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"]
}

Response (201):
{
    "message": "Service created successfully",
    "service": {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Get All Services
```http
GET /api/services
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### Get Single Service
```http
GET /api/services/:id
Authorization: Bearer <token>

Response (200):
{
    "_id": "string",
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
}
```

### Update Service
```http
PUT /api/services/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"]
}

Response (200):
{
    "message": "Service updated successfully",
    "service": {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Delete Service
```http
DELETE /api/services/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Service deleted successfully"
}
```

## Blog API

### Create Blog
```http
POST /api/blogs
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "title": "string",
    "content": "string",
    "imageUrl": "string"
}

Response (201):
{
    "message": "Blog created successfully",
    "blog": {
        "_id": "string",
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Get All Blogs
```http
GET /api/blogs
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### Get Single Blog
```http
GET /api/blogs/:id
Authorization: Bearer <token>

Response (200):
{
    "_id": "string",
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

### Update Blog
```http
PUT /api/blogs/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "title": "string",
    "content": "string",
    "imageUrl": "string"
}

Response (200):
{
    "message": "Blog updated successfully",
    "blog": {
        "_id": "string",
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Delete Blog
```http
DELETE /api/blogs/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Blog deleted successfully"
}
```

## Video API

### Create Video
```http
POST /api/videos
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "title": "string",
    "url": "string",
    "description": "string"
}

Response (201):
{
    "message": "Video created successfully",
    "video": {
        "_id": "string",
        "title": "string",
        "url": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Get All Videos
```http
GET /api/videos
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "title": "string",
        "url": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### Get Single Video
```http
GET /api/videos/:id
Authorization: Bearer <token>

Response (200):
{
    "_id": "string",
    "title": "string",
    "url": "string",
    "description": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

### Update Video
```http
PUT /api/videos/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "title": "string",
    "url": "string",
    "description": "string"
}

Response (200):
{
    "message": "Video updated successfully",
    "video": {
        "_id": "string",
        "title": "string",
        "url": "string",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Delete Video
```http
DELETE /api/videos/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Video deleted successfully"
}
```

## Fleet API

### Create Fleet
```http
POST /api/fleets
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"]
}

Response (201):
{
    "message": "Fleet created successfully",
    "fleet": {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Get All Fleets
```http
GET /api/fleets
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### Get Single Fleet
```http
GET /api/fleets/:id
Authorization: Bearer <token>

Response (200):
{
    "_id": "string",
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
}
```

### Update Fleet
```http
PUT /api/fleets/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "name": "string",
    "imageUrl": "string",
    "description": "string",
    "features": ["string"]
}

Response (200):
{
    "message": "Fleet updated successfully",
    "fleet": {
        "_id": "string",
        "name": "string",
        "imageUrl": "string",
        "description": "string",
        "features": ["string"],
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Delete Fleet
```http
DELETE /api/fleets/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Fleet deleted successfully"
}
```

## Reservation API

### Create Reservation
```http
POST /api/reservations
Content-Type: application/json

Request Body:
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "passengers": "number",
    "pickupAddress": "string",
    "pickupLat": "number (optional)",
    "pickupLon": "number (optional)",
    "destinationAddress": "string",
    "destinationLat": "number (optional)",
    "destinationLon": "number (optional)",
    "date": "string (YYYY-MM-DD)",
    "time": "string (HH:MM)",
    "status": "string (pending/confirmed/cancelled/completed)"
}

Response (201):
{
    "message": "Reservation created successfully",
    "reservation": {
        "_id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "passengers": "number",
        "pickupAddress": "string",
        "pickupLat": "number",
        "pickupLon": "number",
        "destinationAddress": "string",
        "destinationLat": "number",
        "destinationLon": "number",
        "date": "string",
        "time": "string",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Get All Reservations
```http
GET /api/reservations
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "passengers": "number",
        "pickupAddress": "string",
        "pickupLat": "number",
        "pickupLon": "number",
        "destinationAddress": "string",
        "destinationLat": "number",
        "destinationLon": "number",
        "date": "string",
        "time": "string",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

### Get Single Reservation
```http
GET /api/reservations/:id
Authorization: Bearer <token>

Response (200):
{
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "passengers": "number",
    "pickupAddress": "string",
    "pickupLat": "number",
    "pickupLon": "number",
    "destinationAddress": "string",
    "destinationLat": "number",
    "destinationLon": "number",
    "date": "string",
    "time": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

### Update Reservation
```http
PUT /api/reservations/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "passengers": "number",
    "pickupAddress": "string",
    "pickupLat": "number (optional)",
    "pickupLon": "number (optional)",
    "destinationAddress": "string",
    "destinationLat": "number (optional)",
    "destinationLon": "number (optional)",
    "date": "string (YYYY-MM-DD)",
    "time": "string (HH:MM)",
    "status": "string (pending/confirmed/cancelled/completed)"
}

Response (200):
{
    "message": "Reservation updated successfully",
    "reservation": {
        "_id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "passengers": "number",
        "pickupAddress": "string",
        "pickupLat": "number",
        "pickupLon": "number",
        "destinationAddress": "string",
        "destinationLat": "number",
        "destinationLon": "number",
        "date": "string",
        "time": "string",
        "status": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

### Delete Reservation
```http
DELETE /api/reservations/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Reservation deleted successfully"
}
```

## Admin API (No JWT Required)

### Create Admin
```http
POST /api/admins
Content-Type: application/json

Request Body:
{
    "username": "string",
    "password": "string"
}

Response (201):
{
    "message": "Admin created successfully",
    "admin": {
        "_id": "string",
        "username": "string"
    }
}
```

### Get All Admins
```http
GET /api/admins
Authorization: Bearer <token>

Response (200):
[
    {
        "_id": "string",
        "username": "string"
    }
]
```

### Update Admin
```http
PUT /api/admins/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
    "username": "string",
    "password": "string"
}

Response (200):
{
    "message": "Admin updated successfully",
    "admin": {
        "_id": "string",
        "username": "string"
    }
}
```

### Delete Admin
```http
DELETE /api/admins/:id
Authorization: Bearer <token>

Response (200):
{
    "message": "Admin deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
    "message": "Error message describing the issue"
}
```

### 401 Unauthorized
```json
{
    "message": "Authorization header missing"
}
```

### 403 Forbidden
```json
{
    "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
    "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
    "message": "Error message describing the server error"
}
```

## Notes
1. All timestamps are in ISO 8601 format
2. All IDs are MongoDB ObjectIds
3. Protected routes require a valid JWT token in the Authorization header
4. Admin routes (except login) also require JWT authentication
5. Passwords are hashed and never returned in responses 