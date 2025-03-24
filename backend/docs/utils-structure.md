# Utils Directory Structure

## Overview

This document outlines the structure and organization of utility functions in the Twitter Clone application.

## Directory Structure

All utility functions are now consolidated in a single directory:

```
backend/
  └── utils/
      ├── cloudinaryUtils.js
      └── tokenUtils.js
```

## Utility Files

### cloudinaryUtils.js

Contains utilities for Cloudinary integration:

- `uploadImage(imagePath, folder)`: Uploads an image to Cloudinary
- `deleteImage(publicId)`: Deletes an image from Cloudinary
- `getPublicIdFromUrl(url)`: Extracts the public ID from a Cloudinary URL

### tokenUtils.js

Contains utilities for JWT token generation and management:

- `generateTokenAndSetCookie(userID, res)`: Generates a JWT token and sets it as a cookie

## Usage

### Importing Utilities

```javascript
// Import Cloudinary utilities
import {
  uploadImage,
  deleteImage,
  getPublicIdFromUrl,
} from "../utils/cloudinaryUtils.js";

// Import token utilities
import { generateTokenAndSetCookie } from "../utils/tokenUtils.js";
```

## Naming Conventions

- File names use camelCase with a descriptive suffix (e.g., `cloudinaryUtils.js`, `tokenUtils.js`)
- Function names use camelCase and should be descriptive of their purpose
- Each file should focus on a specific category of utilities

## Adding New Utilities

When adding new utility functions:

1. Determine if they fit into an existing category (file)
2. If yes, add them to the appropriate file
3. If no, create a new file following the naming convention
4. Document the new functions in this file

## Legacy Imports

For backward compatibility, some old import paths may still exist in the codebase. These will be gradually updated to use the new structure.

## Verification

The consolidated utils structure has been verified to work correctly:

1. The server starts without errors
2. Database connections are established successfully
3. Authentication functionality works as expected

## Migration Plan

To complete the migration to the new utils structure:

1. **Short-term (Current state)**:

   - New utils file (`tokenUtils.js`) is in place
   - Original file (`generateToken.js`) is kept for backward compatibility
   - Imports in `auth.controller.js` have been updated

2. **Medium-term (Next release)**:

   - Identify and update any remaining imports that use the old path
   - Add deprecation warnings to the old file

3. **Long-term (Future cleanup)**:
   - Remove the old file once all imports have been updated
   - Remove the empty `lib/utils` directory if it's no longer needed
