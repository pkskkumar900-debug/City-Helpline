# 🌟 City Helpline

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="City Helpline Hero Banner" width="100%" style="border-radius: 16px; max-height: 400px; object-fit: cover;" />
</p>

<p align="center">
  <strong>A hyper-local student ecosystem platform connecting students and aspirants with verified PGs, Hostels, Mess services, Study Libraries, Second-Hand Marketplace, and Monthly Budget Intelligence across India.</strong>
</p>

<p align="center">
  <a href="https://github.com/princeraj-in/City-Helpline/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Firebase-v12.11-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
</p>

---

## 📌 Overview

**City Helpline** is a full-stack web application designed to solve common challenges students face when moving to education and coaching hubs (such as Kota, Patna, Delhi, Sikar, Lucknow, and Pune). Finding affordable accommodation, quality food, and essential study infrastructure often involves high brokerages and unverified listings.

City Helpline simplifies this transition through:
- **Zero Brokerage Listings**: Verified PGs, hostels, tiffin/mess services, and 24x7 study libraries.
- **Student Budget Calculator**: Tools to forecast and manage monthly living expenses based on city cost benchmarks.
- **Peer-to-Peer Marketplace**: A dedicated platform for students to buy and sell pre-owned study essentials (books, notes, tables, coolers, and cycles).

---

## ✨ Key Features

### 🔍 1. Hyper-Local Discovery & Filtering
- **Multi-Category Exploration**: Instant search and filtering across categories including *PGs, Hostels, Mess & Tiffin Services, Libraries, Coaching Institutes, and Study Rooms*.
- **Geolocation & City Selection**: Browser geolocation detection with reverse-geocoding, plus manual state and city selection across major student hubs.
- **Instant Search**: Real-time client-side search across listings by title, address, description, and amenities.

### 💰 2. Student Budget Estimator (`/budget`)
- **Flexible Modes**:
  - **Manual Entry**: Input rent, food, library pass, commute, laundry, and pocket money.
  - **Custom Expenses**: Add customized line items (e.g., gym, mobile recharge, medicines) with dynamic chart integration.
  - **Guided Options & Target Budget**: Auto-balance monthly costs against set budget caps.
- **City Living Benchmarks**: Pre-calibrated monthly expenditure indices for major student hubs (Kota, Patna, Delhi, Sikar, Pune, Indore, Jaipur, etc.).
- **Visual Analytics**: Interactive SVG donut chart showing breakdown percentages and affordability status.
- **Export & Share**: Generate formatted WhatsApp summaries for parents/roommates and print or save PDF statements.

### 🛍️ 3. Student Second-Hand Marketplace (`/marketplace`)
- **Direct Peer-to-Peer Deals**: Buy and sell pre-owned academic items without broker fees or commission.
- **Categories**: Books & handwritten notes, study furniture, desert coolers, bicycles, and electronics.
- **Instant Contact**: Direct 1-tap WhatsApp and phone connectivity with sellers.
- **Post Item (`/sell-item`)**: Simple listing workflow with image uploads, item condition tags, and price negotiation options.

### 🛡️ 4. Role-Based Access Control (RBAC)
- **Student / General User (`user`)**: Browse listings, save favorites, write reviews, post marketplace items, and calculate budgets.
- **Contributor (`contributor`)**: Create and manage service listings with photos, amenities, room specifications, and contact information.
- **Administrator (`admin`)**: Moderate submissions (Pending, Approved, Rejected, Featured), monitor system health, and manage user roles.

### ⚡ 5. Media & Storage Pipeline
- **Cloudinary Integration**: Fast client-side image uploads directly to Cloudinary CDN via secure unsigned upload presets, ensuring optimized media delivery.
- **Firebase Firestore**: Real-time NoSQL data synchronization with robust role-enforced security rules.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    City Helpline Client                     │
│               React 19 • TypeScript • Vite                  │
└──────────────┬──────────────────┬─────────────────┬─────────┘
               │                  │                 │
               ▼                  ▼                 ▼
     ┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
     │  Firebase Auth   │ │  Cloudinary  │ │ Budget Estimator │
     │  OAuth / Email   │ │   Image CDN  │ │ & SVG Donut Calc │
     └─────────┬────────┘ └───────┬──────┘ └──────────────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Cloud Firestore Database                  │
│  • /users/{userId}              → User profiles & RBAC      │
│  • /listings/{listingId}        → PGs, Mess, Libraries      │
│  • /reviews/{reviewId}          → Listing ratings & reviews │
│  • /marketplace_items/{itemId}  → Student marketplace posts │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript | Reactive UI architecture and strict type safety |
| **Build Tooling** | Vite 6 | Fast build pipeline and Hot Module Replacement (HMR) |
| **Styling & UI** | Tailwind CSS v4 | Utility-first responsive design and glassmorphism |
| **Animations** | Motion (Framer) | Smooth layout entry and transition animations |
| **Database** | Cloud Firestore | Real-time NoSQL data store with strict security rules |
| **Authentication** | Firebase Authentication | Google OAuth, GitHub OAuth, and Email/Password |
| **Media Hosting** | Cloudinary REST API | Unsigned image uploads and CDN delivery |
| **Icons & Feedback** | Lucide React, Sonner | Modern iconography and non-blocking toast notifications |

---

## 📂 Project Directory Structure

```text
City-Helpline/
├── index.html                   # HTML entry point with OpenGraph meta tags
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── firestore.rules              # Firestore database security rules
├── firebase-blueprint.json      # Schema definitions
├── metadata.json                # Application metadata
├── src/
│   ├── main.tsx                 # Application root entry point
│   ├── App.tsx                  # Router configuration and global layouts
│   ├── index.css                # Global styles, variables, and theme classes
│   ├── types/
│   │   └── index.ts             # Domain interfaces (User, Listing, Review, Marketplace)
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Authentication state and role management
│   │   └── LocationContext.tsx  # User geolocation and selected city state
│   ├── lib/
│   │   ├── firebase.ts          # Firebase SDK initialization
│   │   ├── storage.ts           # Cloudinary upload handler
│   │   ├── budgetBenchmarks.ts  # City living indices and calculations
│   │   ├── marketplaceData.ts   # Marketplace starter catalog and categories
│   │   ├── locationService.ts   # Geolocation and reverse-geocoding utilities
│   │   ├── firestoreError.ts    # Friendly Firestore error parsing
│   │   ├── constants.ts         # Categories and state-city database
│   │   └── utils.ts             # Utility functions
│   ├── components/
│   │   ├── ListingCard.tsx      # Service listing preview card
│   │   ├── AccountSettings.tsx  # User account settings modal
│   │   ├── location/
│   │   │   ├── LocationPromptBanner.tsx # Geolocation prompt
│   │   │   ├── LocationSelectorModal.tsx# City and state picker modal
│   │   │   └── NavbarLocationButton.tsx # Active city button in navbar
│   │   ├── marketplace/
│   │   │   ├── MarketplaceCard.tsx        # Item listing card with quick action CTAs
│   │   │   └── MarketplaceDetailModal.tsx # Full-view item details modal
│   │   ├── budget/
│   │   │   ├── BudgetChart.tsx            # SVG Donut chart component
│   │   │   ├── RecommendedServices.tsx    # Live Firestore matching services
│   │   │   └── BudgetShareModal.tsx       # Share and export statement dialog
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Desktop navigation bar
│   │   │   ├── BottomNav.tsx    # Mobile navigation bar
│   │   │   └── ProtectedRoute.tsx# Role-guarded route wrapper
│   │   └── ui/
│   │       ├── GlassCard.tsx        # Glassmorphic card container
│   │       ├── LiquidGlassCard.tsx  # Ambient gradient border card
│   │       ├── LiquidButton.tsx     # Animated primary button
│   │       ├── LiquidInput.tsx      # Styled input component
│   │       ├── LiquidCheckbox.tsx   # Custom animated checkbox
│   │       └── SearchableSelect.tsx # Searchable dropdown selector
│   └── pages/
│       ├── Home.tsx             # Landing page with hero search and featured sections
│       ├── Search.tsx           # Directory search with multi-facet filters
│       ├── ListingDetails.tsx   # Service details, gallery, and reviews
│       ├── BudgetCalculator.tsx # 3-mode student budget estimator
│       ├── Marketplace.tsx      # Second-hand marketplace feed
│       ├── SellItem.tsx         # Post marketplace item form
│       ├── AddListing.tsx       # Create new service listing form
│       ├── EditListing.tsx      # Update existing listing form
│       ├── AdminDashboard.tsx   # Moderation desk and user management
│       ├── Profile.tsx          # User profile and bookmarked listings
│       └── Auth.tsx             # Login and signup authentication view
```

---

## 🔒 Security Architecture

All data operations in Cloud Firestore are protected by strict security rules defined in `firestore.rules`:

- **Authentication Required**: Write operations require a valid Firebase Auth session.
- **Owner Access Control**: Users can only edit or delete listings, marketplace items, and profiles they own.
- **Admin Governance**: Administrative operations (such as approving listings or modifying roles) require admin credentials.
- **Input Validation**: Strict schema boundaries are enforced on string lengths, allowed properties, price boundaries, and rating ranges.
- **Listing Moderation**: Submitted listings default to `'pending'` status and become publicly visible only after approval.

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/princeraj-in/City-Helpline.git
cd City-Helpline
npm install
```

### 2. Environment Configuration
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```

Configure your environment variables:
```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=cityhelpline_upload

# Firebase Web Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

To run type checking and lint validation:
```bash
npm run lint
```

---

## 🌟 Contributing

Contributions are welcome! Follow these steps to contribute:
1. **Fork** the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Crafted with precision for students across India • <strong>City Helpline</strong>
</p>
