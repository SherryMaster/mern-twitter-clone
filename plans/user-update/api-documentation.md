# User Update API Documentation

## Endpoint

```
PUT /api/users/update
```

## Authentication

This endpoint requires authentication. Include the JWT token in the cookie.

## Request Body

The request body can include any combination of the following fields. Only include the fields you want to update.

```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "currentPassword": "string",
  "newPassword": "string",
  "bio": "string",
  "profileImg": "string",
  "coverImg": "string"
}
```

### Field Descriptions

| Field           | Type   | Required                     | Description                                                                                  |
| --------------- | ------ | ---------------------------- | -------------------------------------------------------------------------------------------- |
| firstName       | string | No                           | User's first name. Cannot be empty if provided.                                              |
| lastName        | string | No                           | User's last name. Cannot be empty if provided.                                               |
| username        | string | No                           | User's username. Must be unique. Cannot be empty if provided.                                |
| email           | string | No                           | User's email address. Must be unique and in valid format. Cannot be empty if provided.       |
| currentPassword | string | Required for password update | Current password for verification when updating password.                                    |
| newPassword     | string | No                           | New password. Must be at least 8 characters long. Requires currentPassword for verification. |
| bio             | string | No                           | User's biography. Can be empty.                                                              |
| profileImg      | string | No                           | URL to user's profile image. Can be empty.                                                   |
| coverImg        | string | No                           | URL to user's cover image. Can be empty.                                                     |

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: field1, field2, ...",
  "data": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "bio": "string",
    "profileImg": "string",
    "coverImg": "string",
    "followers": [],
    "following": [],
    "isAdmin": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### No Changes Response (200 OK)

```json
{
  "success": true,
  "message": "No changes were made",
  "data": {
    // User data (same as above)
  }
}
```

### Error Responses

#### User Not Found (404 Not Found)

```json
{
  "success": false,
  "message": "User not found"
}
```

#### Validation Errors (400 Bad Request)

```json
{
  "success": false,
  "message": "Error message describing the validation issue"
}
```

Possible validation error messages:

- "Username cannot be empty"
- "Username already taken"
- "Email cannot be empty"
- "Invalid email address"
- "Email already taken"
- "First name cannot be empty"
- "Last name cannot be empty"
- "Current password is required to update password"
- "Current password is incorrect"
- "New password must be at least 8 characters long"

#### Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

## Examples

### Example 1: Update Profile Information

**Request:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software developer passionate about web technologies"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: firstName, lastName, bio",
  "data": {
    // Updated user data
  }
}
```

### Example 2: Update Password

**Request:**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: password",
  "data": {
    // User data
  }
}
```

### Example 3: Update Username

**Request:**

```json
{
  "username": "new_username"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: username",
  "data": {
    // Updated user data with new username
  }
}
```
