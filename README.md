# 🎯 MOCK-IQ

**Mock-IQ** is an **AI-powered mock interview app** that leverages the **Gemini API** to provide realistic, interactive interview experiences.  
It helps users practice both technical and behavioral interview questions with instant feedback and improvement suggestions — so you can ace your next interview with confidence!

🌐 **Live Demo:** [mock-iq.vercel.app](https://mock-iq.vercel.app)

---

## 📚 Topics & Tech Stack

- ✨ **Next.js 15** — React framework for SSR and SSG
- 🗄️ **PostgreSQL** — Robust relational database
- 🔑 **Clerk** — Authentication and user management
- 🌿 **Drizzle ORM** — Type-safe and intuitive database access
- 🤖 **Gemini API** — AI-powered interview simulation and feedback

---

## 🚀 Features

- ✅ AI-generated interview questions and scenarios  
- ✅ Covers both technical & behavioral topics  
- ✅ Instant, actionable feedback with improvement suggestions  
- ✅ User authentication and progress tracking  
- ✅ Responsive and accessible UI  
- ✅ Deployed on Vercel

---

## 📸 Screenshots

### 🏠 Home Page
![Landing Page](./public/LandingPage.png)

### 🏠 Dashborad
![Dashboard Page](./public/Dashboard.png)

### 🏠 How It Works?
![How It Works](./public/HowItWorks.png)

### 🎤 Interview Session
![Interview Session](./public/Interview.png)
![Interview Session](./public/Session.png)

### 📊 Results Page
![Results Page](./public/screenshots/results.png)


## 🛠️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/jay1535/MOCK-IQ.git
cd MOCK-IQ
```

### 📦 Install Dependencies

```bash
npm install

```
## 📦 Install Key Dependencies

Below are the commands to install the key dependencies individually:
```bash
npx shadcn-ui@latest init
npm install @clerk/nextjs
npm install @google/generative-ai
```

### 📄 `.env.local`

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
DATABASE_URL=your_postgres_db_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 🚀 Run Development Server

After installing dependencies and setting up your `.env.local`, start the development server with:

```bash
npm run dev
```




