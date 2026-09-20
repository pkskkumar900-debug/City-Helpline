# 🌟 City Helpline — Hyper-Local Student Ecosystem Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="City Helpline Hero Banner" width="100%" style="border-radius: 16px; max-height: 420px; object-fit: cover;" />
</p>

<p align="center">
  <strong>A modern, glassmorphic, hyper-local web platform connecting students and residents with top-tier PGs, Hostels, Mess facilities, Libraries, Coaching Centers, and essential city services across India.</strong>
</p>

<p align="center">
  <a href="#-key-features"><img src="https://img.shields.io/badge/Status-Production%20Ready-00E5FF?style=for-the-badge" alt="Status"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Firebase-v12.11-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Cloudinary-Media%20CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"></a>
</p>

---

## 📌 Executive Summary

**City Helpline** is engineered to address the critical challenges students encounter when relocating to education hubs across India (Kota, Patna, Delhi, Lucknow, Pune, Bengaluru, and more). Built with a state-of-the-art **Liquid Glassmorphic design system**, real-time **Firebase Cloud Firestore**, robust **Multi-Provider Authentication**, and an automated **Cloudinary Unsigned Media Pipeline**, the platform bridges verified local service providers with students seeking dependable accommodation, study spaces, and amenities.

---

## ✨ Core Pillars & Capabilities

### 🔍 1. Hyper-Local Discovery & Multi-Facet Filtering
- **Multi-Category Exploration**: Instant filtering across **13+ curated categories** including *PGs, Hostels, Mess & Tiffin Services, Libraries, Study Rooms, Coaching Institutes, Gyms, Laundries, and Coworking Spaces*.
- **State & City Clustering**: Pre-mapped geo-database spanning **10 Indian States** and **60+ Tier 1, 2, and 3 student hubs**.
- **Real-Time Instant Search**: Live fuzzy search indexing titles, addresses, and descriptions with instant client-side memoization.

### 🛡️ 2. Enterprise Role-Based Access Control (RBAC)
- **Student / General User (`user`)**:
  - Search and browse approved listings.
  - Save favorite listings to their personal profile bookmarks.
  - Submit verified ratings and written reviews.
  - One-tap direct contact via Phone dialer and WhatsApp chat.
- **Service Provider / Contributor (`contributor`)**:
  - Dedicated business profile with contact, address, and verification attributes.
  - Submit listings with pricing, descriptions, and amenities.
  - Upload multi-photo galleries directly to Cloudinary CDN with instant visual previews.
  - Edit and maintain live listings with real-time sync.
- **System Administrator (`admin`)**:
  - Central Command Dashboard with real-time operational metrics.
  - Listing moderation workflow (**Pending**, **Approved**, **Rejected**, or **Featured** status toggles).
  - User governance: manage roles, monitor account status, and enforce instant account bans.

### ⚡ 3. High-Performance Cloudinary Media Pipeline
- **Zero-Blob Client Uploads**: Raw `File` buffers are dispatched directly to Cloudinary's secure unsigned endpoint (`cityhelpline_upload`), guaranteeing production CDN caching and reliable `secure_url` persistence.
- **Multi-Image Compression & Gallery**: Supports up to 10 high-resolution images per listing with dynamic thumbnail carousels and smooth modal previews.

### 🎨 4. Premium Liquid & Glassmorphism Aesthetic
- **Fluid Dark Canvas**: Rich deep-space palette (`#0B0E14`) elevated by dynamic radial ambient lighting and noise diffusion.
- **Aero-Glass Cards**: High-refraction backdrop blur (`blur-30px`) with 3D perspective hover tilts and animated sheen reflections.
- **Golden Metallic Accents**: Precision-crafted micro-interaction buttons with specular highlight animations.
- **Fluid Animations**: Staggered layout entry transitions powered by **Motion (Framer Motion)**.

---

## 🏗️ Architecture & Data Flow

```
                      +--------------------------------------------------+
                      |               City Helpline Client               |
                      |          (React 19 + Vite + Tailwind CSS)        |
                      +--------------------------------------------------+
                                        /         |         \
                                       /          |          \
                 OAuth Popups / Creds /           |           \ Unsigned Multipart
                                     /            |            \ Form Uploads
                                    v             |             v
     +--------------------------------+           |      +-------------------------+
     |     Firebase Authentication    |           |      |   Cloudinary Image CDN  |
     | (Google, GitHub, Password)     |           |      | (Asset Transformation)  |
     +--------------------------------+           |      +-------------------------+
                                    \             |             /
                                     \            |            / Returns
                       User UID Token \           |           / secure_url
                                       v          v          v
                      +--------------------------------------------------+
                      |              Cloud Firestore Database            |
                      |  - /users/{userId}      [Strict Schema Rules]    |
                      |  - /listings/{listingId}[Status: Approved/Pending|
                      |  - /reviews/{reviewId}  [Atomic Calculations]    |
                      +--------------------------------------------------+
```

---

## 💻 Tech Stack & Engineering Specifications

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.0` | Next-gen declarative UI architecture |
| **Language** | TypeScript | `~5.8.2` | Strict end-to-end type safety |
| **Build Tooling** | Vite | `^6.2.0` | Ultra-fast HMR and optimized production bundles |
| **Styling Engine** | Tailwind CSS | `^4.1.14` | Zero-runtime modern utility styling |
| **Motion & Physics** | Motion (Framer) | `^12.23.24` | 60fps spring transitions & layout animations |
| **Cloud Database** | Cloud Firestore | `^12.11.0` | Real-time NoSQL storage with security rules |
| **Authentication** | Firebase Auth | `^12.11.0` | Google OAuth, GitHub OAuth, Email/Password |
| **Media Pipeline** | Cloudinary API | REST / Unsigned | Automated CDN image upload & hosting |
| **Iconography** | Lucide React | `^0.546.0` | Scalable micro-vector icon library |
| **Notifications** | Sonner | `^2.0.7` | Elegant, non-blocking toast notifications |

---

## 📂 Project Directory Structure

```
city-helpline/
├── index.html                   # HTML5 Entry Point with dynamic OpenGraph SEO
├── package.json                 # Project dependencies, build scripts & engine config
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler plugins and server mapping
├── firestore.rules              # Production-grade Firestore security rules
├── firebase-blueprint.json      # Structured Firestore schema blueprints
├── metadata.json                # Application metadata & permissions
├── src/
│   ├── main.tsx                 # React virtual DOM bootstrap
│   ├── App.tsx                  # Root router, dynamic themes, and route guards
│   ├── index.css                # Master CSS, ambient gradients, and liquid animations
│   ├── types/
│   │   └── index.ts             # Domain models (UserProfile, Listing, Review, Roles)
│   ├── contexts/
│   │   └── AuthContext.tsx      # Global auth state, session snapshot, and RBAC context
│   ├── lib/
│   │   ├── firebase.ts          # Firebase SDK initialization & auth providers
│   │   ├── storage.ts           # Cloudinary unsigned upload client handler
│   │   ├── constants.ts         # Categories & State-City relational mapping
│   │   └── utils.ts             # Utility functions (cn class-merge helper)
│   ├── components/
│   │   ├── ListingCard.tsx      # Modular glassmorphic listing card component
│   │   ├── AccountSettings.tsx  # User profile & credentials manager
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Desktop glassmorphic navigation bar
│   │   │   ├── BottomNav.tsx    # Mobile touch-first navigation bar
│   │   │   └── ProtectedRoute.tsx# Role-aware navigation barrier
│   │   └── ui/
│   │       ├── GlassCard.tsx    # Backdrop-blur container with dynamic lighting
│   │       ├── LiquidButton.tsx # Kinetic liquid-gradient button
│   │       ├── LiquidInput.tsx  # Form input with interactive focus states
│   │       ├── LiquidCheckbox.tsx# Animated custom checkbox component
│   │       └── SearchableSelect.tsx# Grouped searchable dropdown selector
│   └── pages/
│       ├── Home.tsx             # Landing experience, hero search, featured feeds
│       ├── Search.tsx           # Multi-filter search engine and catalog
│       ├── ListingDetails.tsx   # Detailed specs, gallery, contact CTA, reviews
│       ├── AddListing.tsx       # Contributor creation form with Cloudinary upload
│       ├── EditListing.tsx      # Listing updating & existing media manager
│       ├── AdminDashboard.tsx   # Admin moderation desk and user management
│       ├── Profile.tsx          # User profile, saved favorites, and listings
│       └── Auth.tsx             # Unified Login/Signup with OAuth popups
```

---

## 🔒 Security Architecture & Firestore Rules

All data mutations are governed by rigorous Firestore security rules:

- **Identity Verification**: Ensures requests are authenticated via Firebase Auth tokens (`request.auth != null`).
- **Ownership Invariance**: Creators retain exclusive edit access over their own listings and profile records.
- **Role Elevation Guard**: Standard users cannot self-assign `contributor` or `admin` privileges.
- **Strict Data Validation (`isValidListing`, `isValidUser`, `isValidReview`)**:
  - All submitted documents strictly enforce allowed field lists (`hasOnlyAllowedFields`).
  - Strict string boundaries: Titles (<200 chars), Descriptions (<5000 chars), Addresses (<500 chars).
  - Sanitized numbers: Prices must be non-negative (`>= 0`), ratings must be bounded between `1` and `5`.
  - Max image gallery length capped at `10` URLs.
- **Automated Moderation Gate**: All new listings default to `'pending'` status, requiring administrator review before appearing in public searches.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** package manager

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/city-helpline.git
cd city-helpline
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to create your local `.env`:
```bash
cp .env.example .env
```

Ensure your credentials are appropriately configured:
```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=djpqwrs1l
VITE_CLOUDINARY_UPLOAD_PRESET=cityhelpline_upload

# Firebase Web App Keys (Auto-configured or custom)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Launch Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000`.

### 4. Build for Production
To compile and minify the applet for production deployment:
```bash
npm run build
```
The optimized assets will be emitted to the `dist/` directory.

### 5. Type Checking & Verification
```bash
npm run lint
```

---

## 🗺️ Supported Regions & Coverage

City Helpline features mapped hierarchies for major educational hubs:

| State | Primary Student Cities |
| :--- | :--- |
| **Rajasthan** | Kota, Jaipur, Jodhpur, Sikar, Bikaner, Udaipur |
| **Bihar** | Patna, Gaya, Muzaffarpur, Bhagalpur, Darbhanga |
| **Uttar Pradesh** | Lucknow, Kanpur, Varanasi, Prayagraj, Noida, Ghaziabad |
| **Delhi NCR** | New Delhi, North Delhi, South Delhi, Dwarka, Rohini |
| **Maharashtra** | Pune, Mumbai, Nagpur, Nashik, Navi Mumbai |
| **Karnataka** | Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi |
| **Madhya Pradesh**| Indore, Bhopal, Gwalior, Jabalpur, Ujjain |
| **Gujarat** | Ahmedabad, Vadodara, Surat, Gandhinagar, Rajkot |
| **West Bengal** | Kolkata, Durgapur, Siliguri, Kharagpur, Asansol |
| **Tamil Nadu** | Chennai, Coimbatore, Madurai, Vellore, Tiruchirappalli |

---

## 🌟 Contributing & Quality Guidelines

1. **Fork the Repository** and create a feature branch (`git checkout -b feature/AmazingFeature`).
2. **Commit Changes** with descriptive conventional commit messages (`git commit -m 'feat: add interactive map coordinates'`).
3. **Validate Builds**: Ensure `npm run lint` and `npm run build` pass without warnings.
4. **Open a Pull Request** against the `main` branch.

---

## 📄 License & Attribution

Distributed under the **Apache 2.0 License**. See `LICENSE` for more information.

<p align="center">
  Crafted with precision for students across India • <strong>City Helpline</strong>
</p>
