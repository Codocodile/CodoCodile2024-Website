# CodoCodile 2025 - Frontend

A modern, responsive frontend for the CodoCodile programming contest website built with Next.js 16, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Modern UI/UX**: Clean, minimal design with beautiful animations and transitions
- **Responsive Design**: Fully responsive across all device sizes
- **Persian Language Support**: RTL layout optimized for Persian content
- **Custom Color Palette**: Beautiful green-themed design system
- **Smooth Animations**: Framer Motion powered animations and micro-interactions
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Gradient Backgrounds**: Beautiful gradient combinations

## 🚀 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🎯 Key Features

### Landing Page

- Hero section with animated text and floating elements
- About section with feature cards and statistics
- Rules section with collapsible content
- Timeline with progress indicators
- Team section with member profiles
- Contact form with validation
- Responsive footer

### Authentication

- User registration with multi-step form
- User login with error handling
- JWT token management
- Protected routes
- Password reset functionality

### Dashboard

- User profile overview
- Team management
- Contest information
- Quick actions

## 🎨 Color Palette

The design uses a carefully crafted green color palette:

- **Primary Green**: `#32814D` - Main brand color
- **Light Green**: `#90C964` - Accent color
- **Dark Green**: `#224335` - Text and dark elements
- **Light Accent**: `#B8DA9A` - Light backgrounds
- **Cream Background**: `#FEFDF8` - Main background

## 📁 Project Structure

```
new-frontend/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── sign-in/          # Sign-in page
│   ├── sign-up/          # Sign-up page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Rules.tsx         # Rules section
│   ├── Timeline.tsx      # Timeline section
│   ├── Team.tsx          # Team section
│   ├── Contact.tsx       # Contact section
│   └── Footer.tsx        # Footer component
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility functions
│   ├── api.ts           # API client and functions
│   ├── constants.ts     # App constants
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
│   └── index.ts         # Type definitions
└── tailwind.config.ts   # Tailwind configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Update the API URL in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend integrates with the Django REST API backend:

### Authentication Endpoints

- `POST /token/` - User login
- `POST /create-challenger/` - User registration
- `POST /confirm-challenger/` - Account confirmation
- `POST /password-reset/` - Password reset request
- `PUT /password-reset/` - Password reset

### User Endpoints

- `GET /view-challenger/` - Get user profile
- `PUT /update-challenger/` - Update user profile
- `PUT /cv/` - Upload CV
- `GET /search-challenger/` - Search challengers

### Team Endpoints

- `POST /team/` - Create team
- `GET /team/` - Get team info
- `PUT /team/` - Update team
- `DELETE /team/` - Delete team
- `POST /invitation/` - Send invitation
- `GET /invitation/` - Get invitations
- `PUT /accept-invitation/` - Accept/reject invitation

## 🎨 Design System

### Components

- **Buttons**: Primary, secondary, outline, ghost variants
- **Cards**: Standard, hover, glow effects
- **Inputs**: Form inputs with validation states
- **Badges**: Status indicators
- **Glass Effects**: Backdrop blur components

### Animations

- Fade in/out transitions
- Scale animations
- Floating elements
- Gradient animations
- Scroll-triggered animations

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- JWT token authentication
- Automatic token refresh
- Protected routes
- Input validation
- XSS protection

## 🌍 Internationalization

- RTL layout support
- Persian language optimized
- Proper text direction handling
- Cultural design considerations

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting service

### Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the CodoCodile 2025 programming contest organized by Sharif University of Technology.

## 🎯 Future Enhancements

- Real-time notifications
- Advanced team management
- Contest live streaming
- Mobile app integration
- Advanced analytics dashboard
- Multi-language support

---

Built with ❤️ for the CodoCodile 2025 programming contest
