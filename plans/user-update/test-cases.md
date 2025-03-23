# User Update Test Cases

## Test Case 1: Update Single Field (First Name)

**Request:**

```json
{
  "firstName": "NewFirstName"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: firstName",
  "data": {
    // User data with updated firstName
  }
}
```

## Test Case 2: Update Multiple Fields

**Request:**

```json
{
  "firstName": "NewFirstName",
  "lastName": "NewLastName",
  "bio": "This is my new bio"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: firstName, lastName, bio",
  "data": {
    // User data with updated fields
  }
}
```

## Test Case 3: Update Password with Verification

**Request:**

```json
{
  "currentPassword": "correctPassword123",
  "newPassword": "newValidPassword123"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully. Updated fields: password",
  "data": {
    // User data without password
  }
}
```

## Test Case 4: Update Password with Incorrect Current Password

**Request:**

```json
{
  "currentPassword": "wrongPassword123",
  "newPassword": "newValidPassword123"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

## Test Case 5: Update Password with Invalid New Password

**Request:**

```json
{
  "currentPassword": "correctPassword123",
  "newPassword": "short"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "New password must be at least 8 characters long"
}
```

## Test Case 6: Update Username to One That's Already Taken

**Request:**

```json
{
  "username": "existingUsername"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Username already taken"
}
```

## Test Case 7: Update Email with Invalid Format

**Request:**

```json
{
  "email": "invalid-email"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Invalid email address"
}
```

## Test Case 8: Update with Empty Required Field

**Request:**

```json
{
  "firstName": ""
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "First name cannot be empty"
}
```

## Test Case 9: Update with No Changes

**Request:**

```json
{
  "firstName": "CurrentFirstName" // Same as current value
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "No changes were made",
  "data": {
    // Current user data
  }
}
```

## Test Case 10: Update with Mixed Valid and Invalid Fields

**Request:**

```json
{
  "firstName": "NewFirstName",
  "email": "invalid-email"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Invalid email address"
}
```
