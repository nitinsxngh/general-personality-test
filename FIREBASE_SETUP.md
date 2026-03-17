# Firebase Authentication Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following Firebase configuration:

```env
# Firebase Configuration (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Server-side Firebase Configuration (for admin SDK)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# MongoDB Configuration (existing)
MONGODB_URI=your-mongodb-atlas-url
```

## Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
   - Enable Google authentication (click on Google, enable it, and configure OAuth consent screen)
4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web app icon
   - Copy the config values to your `.env.local` file

## Features Added

- **Authentication Required**: Users must sign in before taking the personality test
- **Multiple Sign-in Options**: Email/Password and Google authentication
- **Sign In/Sign Up Modal**: Clean modal interface for authentication
- **Protected Routes**: Test page is now protected and requires authentication
- **User State Management**: Global authentication state with React Context
- **Logout Functionality**: Users can sign out from the navbar
- **Responsive Design**: Authentication works on both desktop and mobile
- **Google OAuth**: One-click sign-in with Google accounts

## Usage

1. Users click "Take Free Personality Test" on the landing page
2. They are redirected to a sign-in page if not authenticated
3. Users can sign in with:
   - Email and password (create new account or sign in)
   - Google account (one-click authentication)
4. After authentication, they can access the personality test
5. Users can sign out using the logout button in the navbar

## Security

- Firebase handles all authentication securely
- User data is protected and only accessible to authenticated users
- No sensitive data is stored in local storage
- All authentication state is managed server-side through Firebase
