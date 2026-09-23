# 🌟 City Helpline — Hyper-Local Student Ecosystem Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="City Helpline Hero Banner" width="100%" style="border-radius: 16px; max-height: 420px; object-fit: cover;" />
</p>

<p align="center">
  <strong>A modern, glassmorphic, hyper-local web platform connecting students and coaching aspirants with verified PGs, Hostels, Mess facilities, Study Libraries, Second-Hand Student Marketplace, and Monthly Budget Intelligence across India.</strong>
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

**City Helpline** is engineered to eliminate the stress, high brokerages, and misinformation students face when relocating to premier education and coaching hubs across India (Kota, Patna, Delhi NCR, Sikar, Lucknow, Prayagraj, Pune, Indore, and Jaipur).

Built with a cutting-edge **Liquid Glassmorphism UI**, real-time **Firebase Cloud Firestore**, robust **Role-Based Access Control (RBAC)**, an automated **Cloudinary Unsigned Media Pipeline**, and an interactive **Monthly Budget Calculator & Student Marketplace**, the platform empowers students to:
- Find and book verified **PGs, Hostels, Mess/Tiffins, and 24x7 AC Study Libraries** with zero brokerage.
- Buy and sell second-hand study equipment (**Books & Notes, Coolers, Cycles, Study Tables**) peer-to-peer.
- Accurately forecast and plan monthly expenses with custom manual inputs, city living indexes, and WhatsApp statements for parents.

---

## ✨ Core Pillars & Capabilities

### 🔍 1. Hyper-Local Discovery & Multi-Facet Filtering
- **Multi-Category Exploration**: Instant filtering across **13+ curated categories** including *PGs, Hostels, Mess & Tiffin Services, Libraries, Study Rooms, Coaching Institutes, Gyms, Laundries, and Coworking Spaces*.
- **State & City Clustering**: Pre-mapped geo-database spanning **10 Indian States** and **60+ Tier 1, 2, and 3 student hubs**.
- **Live Location Detection**: High-precision browser geolocation detection with reverse-geocoding and instant hub switching.
- **Real-Time Instant Search**: Live fuzzy search indexing titles, addresses, amenities, and descriptions with instant client-side memoization.

### 💰 2. Monthly Student Budget Estimator (`/budget`)
- **Three Intelligent Calculation Modes**:
  1. ✍️ **Manual Entry (मैन्युअल खुद भरें)**: Direct numeric input for Room Rent, Electricity/AC Bill, Mess/Tiffin, Library Pass, Commute, Laundry, Coaching/Books, and Pocket Money.
  2. ➕ **Custom Expense Creator**: Add arbitrary extra expenses (e.g. *Gym, Mobile & Wi-Fi Recharge, Milk & Fruits, Medicine*) with instant color-coded dynamic chart inclusion.
  3. 🎛️ **Guided Options (विकल्प चुनें)**: Select from Single AC, Double Non-AC, Triple sharing, 3-meal mess plans, and library shifts.
  4. ⚡ **Auto-Fit Target Budget (टारगेट बजट)**: Give a total monthly limit (e.g. ₹9,000/mo) and the engine automatically balances expenses based on city cost ratios.
- **City Living Benchmarks**: Pre-calibrated monthly expenditure indices for major student hubs: Kota, Patna, Delhi (Mukherjee Nagar/Kalu Sarai), Sikar, Lucknow, Prayagraj, Pune, Indore, and Jaipur.
- **Reactive SVG Donut Visualizer**: Real-time color-coded donut chart, percentage allocations, city average comparison, and feasibility badges (*Ultra-Budget, Optimal & Recommended, Comfortable, Premium*).
- **Curated Service Matching**: Queries live Firestore listings to recommend an affordable **PG + Mess + Library Combo** matching the student's calculated monthly ceiling.
- **Multi-Channel Sharing & Statement**:
  - One-tap formatted WhatsApp breakdown for parents and roommates.
  - Quick clipboard summary text copy.
  - **"Download"** button generating an official, beautifully styled offline budget statement file.

### 🛍️ 3. Student Second-Hand Marketplace (`/marketplace`)
- **Peer-to-Peer Student Exchange**: Buy and sell pre-owned study essentials directly without platform fees or middleman charges.
- **Tailored Academic Categories**:
  - 📚 *Books & Handwritten Notes* (JEE, NEET, UPSC, SSC, GATE)
  - 🪑 *Study Furniture* (Wooden study tables, ergonomic chairs, bookshelves)
  - ❄️ *Coolers & Fans* (Desert coolers, high-speed fans)
  - 🚲 *Cycles & Bikes* (Geared/standard cycles for coaching commute)
  - 🔌 *Electronics & Gadgets* (Study lamps, scientific calculators, power banks)
  - 🛏️ *Mattress & Bedding* (Single bed mattresses, pillows, blankets)
- **Direct WhatsApp & Phone Connectivity**: Instant 1-tap WhatsApp chat and phone dialer pre-populated with item inquiries.
- **Post Your Item Workflow (`/post-item`)**: Simple listing form with multi-image Cloudinary CDN uploads, condition tag selection (*Brand New, Like New, Good, Fair*), price negotiation toggle, and seller city tags.

### 🛡️ 4. Enterprise Role-Based Access Control (RBAC)
- **Student / General User (`user`)**:
  - Search and browse verified property & service listings.
  - Save favorite listings to personal bookmarks.
  - Submit verified ratings and written reviews.
  - Post items to the Student Marketplace and manage their listings.
  - Estimate and download monthly budget plans.
- **Service Provider / Contributor (`contributor`)**:
  - Dedicated contributor profile with business contact and address verification.
  - List properties with pricing, amenities, room specifications, and food menus.
  - Upload multi-photo galleries directly to Cloudinary CDN with instant visual previews.
  - Edit and maintain live listings with real-time sync.
- **System Administrator (`admin`)**:
  - Central Command Dashboard with operational metrics.
  - Listing moderation workflow (**Pending**, **Approved**, **Rejected**, or **Featured** status toggles).
  - User governance: manage roles, monitor account status, and enforce instant bans.

### ⚡ 5. High-Performance Cloudinary Media Pipeline
- **Zero-Blob Client Uploads**: Raw `File` buffers are dispatched directly to Cloudinary's secure unsigned endpoint (`cityhelpline_upload`), guaranteeing production CDN caching and reliable `secure_url` persistence.
- **Multi-Image Compression & Gallery**: Supports multiple high-resolution photos per listing and marketplace item with dynamic thumbnail carousels and smooth modal previews.

### 🎨 6. Premium Liquid & Glassmorphism Aesthetic
- **Fluid Dark Canvas**: Rich deep-space palette (`#0B0E14`) elevated by dynamic radial ambient lighting and noise diffusion.
- **Aero-Glass Cards**: High-refraction backdrop blur (`blur-30px`) with 3D perspective hover tilts and animated sheen reflections.
- **Golden & Neon Accents**: Precision-crafted micro-interaction buttons (`#00E5FF`, `#F59E0B`, `#A855F7`) with specular highlight animations.
- **Fluid Animations**: Staggered layout entry transitions powered by **Motion (Framer Motion)**.

---

## 🏗️ Architecture & Data Flow

```
                      +--------------------------------------------------+
                      |               City Helpline Client               |
                      |          (React 19 + Vite + Tailwind CSS)        |
                      +--------------------------------------------------+
                             /            |           \              \
            OAuth / Auth    /             |            \ Media Upload \ Budget Plan
                           v              |             v              v
     +--------------------------------+   |   +-------------------+  +------------------+
     |     Firebase Authentication    |   |   | Cloudinary Image  |  | Benchmark Engine |
     | (Google, GitHub, Password)     |   |   | CDN (Unsigned)    |  | & SVG Donut Calc |
     +--------------------------------+   |   +-------------------+  +------------------+
                           \              |             /
                            \             |            / secure_url
                             v            v           v
                      +--------------------------------------------------+
                      |              Cloud Firestore Database            |
                      |  - /users/{userId}        [Profiles & Roles]     |
                      |  - /listings/{listingId}  [PG, Mess, Library]    |
                      |  - /reviews/{reviewId}    [Atomic Reviews]       |
                      |  - /marketplace/{itemId}  [Student Buy & Sell]   |
                      +--------------------------------------------------+
```

---

## 💻 Tech Stack & Engineering Specifications

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.0` | Modern component architecture & reactive hooks |
| **Language** | TypeScript | `~5.8.2` | Strict end-to-end type safety |
| **Build Tooling** | Vite | `^6.2.0` | High-speed HMR and optimized production bundles |
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
│   │   └── index.ts             # Domain models (UserProfile, Listing, Review, Marketplace)
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Global auth state, session snapshot, and RBAC context
│   │   └── LocationContext.tsx  # Geo-location detection & target city state
│   ├── lib/
│   │   ├── firebase.ts          # Firebase SDK initialization & auth providers
│   │   ├── storage.ts           # Cloudinary unsigned upload client handler
│   │   ├── budgetBenchmarks.ts  # City living indices & saving hacks for 10+ hubs
│   │   ├── marketplaceData.ts   # Marketplace starter catalog & category definitions
│   │   ├── constants.ts         # Categories & State-City relational mapping
│   │   └── utils.ts             # Utility functions (cn class-merge helper)
│   ├── components/
│   │   ├── ListingCard.tsx      # Modular glassmorphic listing card component
│   │   ├── AccountSettings.tsx  # User profile & credentials manager
│   │   ├── marketplace/
│   │   │   ├── MarketplaceCard.tsx        # Buy & sell item card with contact CTAs
│   │   │   └── MarketplaceDetailModal.tsx # Full screen item viewer & seller details
│   │   ├── budget/
│   │   │   ├── BudgetChart.tsx            # Reactive SVG Donut & percentage progress
│   │   │   ├── RecommendedServices.tsx    # Live Firestore matching PG+Mess+Library
│   │   │   └── BudgetShareModal.tsx       # WhatsApp share, text copy & download statement
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Desktop glassmorphic navigation bar
│   │   │   ├── BottomNav.tsx    # Mobile touch-first navigation bar
│   │   │   └── ProtectedRoute.tsx# Role-aware navigation barrier
│   │   └── ui/
│   │       ├── GlassCard.tsx        # Backdrop-blur container with dynamic lighting
│   │       ├── LiquidGlassCard.tsx  # Animated multi-color specular border card
│   │       ├── LiquidButton.tsx     # Kinetic liquid-gradient button
│   │       ├── LiquidInput.tsx      # Form input with interactive focus states
│   │       ├── LiquidCheckbox.tsx   # Animated custom checkbox component
│   │       └── SearchableSelect.tsx # Grouped searchable dropdown selector
│   └── pages/
│       ├── Home.tsx             # Landing experience, hero search, marketplace & budget CTA
│       ├── Search.tsx           # Multi-filter search engine and catalog
│       ├── ListingDetails.tsx   # Detailed specs, gallery, contact CTA, reviews
│       ├── BudgetCalculator.tsx # 3-mode student budget planner with custom expense creator
│       ├── Marketplace.tsx      # Student marketplace directory with category filters
│       ├── PostMarketplaceItem.tsx # Sell second-hand items with Cloudinary photo uploads
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
- **Ownership Invariance**: Creators retain exclusive edit access over their own listings, marketplace posts, and profile records.
- **Role Elevation Guard**: Standard users cannot self-assign `contributor` or `admin` privileges.
- **Strict Data Validation (`isValidListing`, `isValidUser`, `isValidReview`)**:
  - All submitted documents strictly enforce allowed field lists (`hasOnlyAllowedFields`).
  - String length bounds: Titles (<200 chars), Descriptions (<5000 chars), Addresses (<500 chars).
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
