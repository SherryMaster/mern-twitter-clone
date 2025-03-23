# User Update API with Cloudinary Integration

## Endpoint

```
PUT /api/users/update
```

## Authentication

This endpoint requires authentication. Include the JWT token in the cookie.

## Request

The endpoint supports both `application/json` and `multipart/form-data` content types.

### For Image Uploads (multipart/form-data)

```
Content-Type: multipart/form-data

Form Data:
- firstName: string (optional)
- lastName: string (optional)
- username: string (optional)
- email: string (optional)
- currentPassword: string (required for password update)
- newPassword: string (optional)
- bio: string (optional)
- profileImg: File (optional) - Image file for profile picture
- coverImg: File (optional) - Image file for cover picture
```

### For Regular Updates (application/json)

```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "currentPassword": "string",
  "newPassword": "string",
  "bio": "string",
  "profileImg": "string", // URL
  "coverImg": "string" // URL
}
```

## Field Descriptions

| Field           | Type        | Required                     | Description                                                                                  |
| --------------- | ----------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| firstName       | string      | No                           | User's first name. Cannot be empty if provided.                                              |
| lastName        | string      | No                           | User's last name. Cannot be empty if provided.                                               |
| username        | string      | No                           | User's username. Must be unique. Cannot be empty if provided.                                |
| email           | string      | No                           | User's email address. Must be unique and in valid format. Cannot be empty if provided.       |
| currentPassword | string      | Required for password update | Current password for verification when updating password.                                    |
| newPassword     | string      | No                           | New password. Must be at least 8 characters long. Requires currentPassword for verification. |
| bio             | string      | No                           | User's biography. Can be empty.                                                              |
| profileImg      | File/string | No                           | User's profile image. Can be a file upload or a URL string.                                  |
| coverImg        | File/string | No                           | User's cover image. Can be a file upload or a URL string.                                    |

## Image Upload Constraints

- Supported file types: Images only (JPEG, PNG, GIF, etc.)
- Maximum file size: 5MB per image
- Images are stored in Cloudinary with the following folder structure:
  - Profile images: `twitter-clone/profile-images/`
  - Cover images: `twitter-clone/cover-images/`

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
    "profileImg": "string", // Cloudinary URL
    "coverImg": "string", // Cloudinary URL
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

#### File Upload Errors (400 Bad Request)

```json
{
  "success": false,
  "message": "Error message describing the file upload issue"
}
```

Possible file upload error messages:

- "Only image files are allowed!"
- "File too large. Maximum size is 5MB."
- "Failed to upload profile image"
- "Failed to upload cover image"
- "Error processing profile image"
- "Error processing cover image"

#### Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

## Examples

### Example 1: Update Profile Image

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [image file]
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: profileImg",
  "data": {
    // User data with Cloudinary profileImg URL
  }
}
```

### Example 2: Update Profile Information with Image

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- firstName: "John"
- lastName: "Doe"
- bio: "Software developer"
- profileImg: [image file]
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: firstName, lastName, bio, profileImg",
  "data": {
    // Updated user data with Cloudinary profileImg URL
  }
}
```

### Example 3: Update Password

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
