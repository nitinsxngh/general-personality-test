# ILC Personality Assessment Platform

A comprehensive personality assessment platform built with Next.js, featuring psychometric testing, career guidance, and user authentication.

## 🌟 Features

### Core Functionality
- **Personality Assessment**: Comprehensive psychometric testing using scientifically validated models
- **Multiple Test Types**: MBTI, Big Five (ILC), and RIASEC career interest assessments
- **User Authentication**: Firebase-powered login system with Google OAuth support
- **Personal Dashboard**: Track your assessment history and view detailed results
- **Career Guidance**: Personalized career recommendations based on personality traits
- **Multi-language Support**: Available in English and Hindi

### Technical Features
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, NextUI
- **Database Integration**: MongoDB with user-specific data storage
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Real-time Updates**: Dynamic content and live assessment tracking
- **Security**: Encrypted data storage and secure authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitinsxngh/general-personality-test.git
   cd general-personality-test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Database
   DB_URL=your_mongodb_connection_string
   DB_NAME=ilc_assessment
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Environment
   NEXT_PUBLIC_ENV=development
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   └── [locale]/          # Internationalized routes
│       ├── dashboard/      # User dashboard
│       ├── test/          # Assessment pages
│       ├── result/        # Results pages
│       └── about/         # About page
├── components/            # Reusable UI components
│   ├── auth-modal.tsx     # Authentication modal
│   ├── user-dashboard.tsx # User dashboard component
│   └── ...
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
├── actions/               # Server actions
│   └── index.ts           # Database operations
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🗄️ Database Schema

The platform uses MongoDB with the following collection structure:

### `ilc_generalpersonalitytest` Collection
```javascript
{
  testId: string,           // Test identifier
  lang: string,             // Language code
  invalid: boolean,         // Test validity
  timeElapsed: number,      // Time taken (seconds)
  dateStamp: Date,          // Completion timestamp
  answers: Answer[],        // User responses
  userId: string,           // Firebase user ID
  userEmail: string,        // User email
  userName: string,         // User display name
  userPhotoURL: string,     // User profile photo
  testType: string,         // Assessment type
  version: string,          // Platform version
  createdAt: Date,          // Record creation
  updatedAt: Date           // Last update
}
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication with Email/Password and Google providers
3. Add your Firebase configuration to `.env.local`

### MongoDB Setup
1. Create a MongoDB Atlas cluster or local instance
2. Create a database named `ilc_assessment`
3. Add your connection string to `.env.local`

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URL` | MongoDB connection string | Yes |
| `DB_NAME` | Database name | Yes |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase configuration | Yes |
| `NEXT_PUBLIC_ENV` | Environment (development/production) | No |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build test
npm run build
```

## 📱 Features Overview

### For Individuals
- Take comprehensive personality assessments
- View detailed personality reports
- Get personalized career recommendations
- Track assessment history
- Export results and reports

### For Recruiters
- Find candidates with matching personality traits
- Reduce hiring time with personality-based screening
- Improve employee retention
- Access candidate assessment data (coming soon)

## 🌐 ILC Ecosystem

This platform is part of the ILC (Integrated Learning Circle) ecosystem:
- **Resume Builder**: [https://resumebuilder.ilc.limited/](https://resumebuilder.ilc.limited/)
- **Student Assessment**: [https://assessment.ilc.limited/](https://assessment.ilc.limited/)
- **ILC Forum**: [https://forum.ilc.limited/](https://forum.ilc.limited/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@ilc.limited
- **Website**: [https://ilc.limited](https://ilc.limited)
- **Documentation**: [https://docs.ilc.limited](https://docs.ilc.limited)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [NextUI](https://nextui.org/)
- Personality models from [IPIP-NEO-PI](https://github.com/kholia/IPIP-NEO-PI)
- Authentication by [Firebase](https://firebase.google.com/)
- Database by [MongoDB](https://www.mongodb.com/)

---

**ILC Limited** - Empowering individuals and organizations through comprehensive personality assessment and career guidance.
