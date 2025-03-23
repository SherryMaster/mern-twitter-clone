# Cloudinary Integration Test Cases

## Test Case 1: Upload Profile Image

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [image file]
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: profileImg",
  "data": {
    // User data with updated profileImg URL
  }
}
```

## Test Case 2: Upload Cover Image

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- coverImg: [image file]
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: coverImg",
  "data": {
    // User data with updated coverImg URL
  }
}
```

## Test Case 3: Upload Both Profile and Cover Images

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [image file]
- coverImg: [image file]
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: profileImg, coverImg",
  "data": {
    // User data with updated profileImg and coverImg URLs
  }
}
```

## Test Case 4: Upload Image with Other Profile Updates

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [image file]
- firstName: "New First Name"
- bio: "New bio text"
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: firstName, bio, profileImg",
  "data": {
    // User data with updated fields
  }
}
```

## Test Case 5: Upload Invalid File Type

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [non-image file, e.g., .txt or .pdf]
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Only image files are allowed!"
}
```

## Test Case 6: Upload File Exceeding Size Limit

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [image file > 5MB]
```

**Expected Response:**

```json
{
  "success": false,
  "message": "File too large. Maximum size is 5MB."
}
```

## Test Case 7: Update Profile Image URL Directly

**Request:**

```json
{
  "profileImg": "https://example.com/image.jpg"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: profileImg",
  "data": {
    // User data with updated profileImg URL
  }
}
```

## Test Case 8: Replace Existing Profile Image

**Request:**

```
PUT /api/users/update
Content-Type: multipart/form-data

Form Data:
- profileImg: [new image file]
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: profileImg",
  "data": {
    // User data with updated profileImg URL
    // Old image should be deleted from Cloudinary
  }
}
```
