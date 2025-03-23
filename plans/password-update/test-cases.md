# Password Update Test Cases

## Test Case 1: Correct current password and valid new password

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
  "message": "User updated successfully",
  "data": {
    // User data without password
  }
}
```

## Test Case 2: Incorrect current password

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

## Test Case 3: Valid current password but invalid new password (too short)

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

## Test Case 4: Missing current password but with new password

**Request:**

```json
{
  "newPassword": "newValidPassword123"
}
```

**Expected Response:**

```json
{
  "success": false,
  "message": "Current password is required to update password"
}
```

## Test Case 5: Update other fields without changing password

**Request:**

```json
{
  "firstName": "NewFirstName",
  "lastName": "NewLastName"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    // Updated user data without password
  }
}
```
