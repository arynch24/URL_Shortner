# 🔗 URL Shortener

A full-stack **URL Shortener** built using **Next.js 14 App Router**, **TypeScript**, **Prisma**, **NeonDB (PostgreSQL)**, and **NextAuth**.  
Users can shorten long links, generate QR codes, and manage their personalized dashboard — all protected with authentication.

### 🚀 [Live Demo](https://cuttely.vercel.app)

---

## 📌 Features

- 🔐 Authentication with **Google OAuth** and **Credentials (email + password)** using NextAuth
- 🧾 Dashboard to view & manage your shortened links
- 🔗 Shorten long URLs with a single click
- 📷 Generate and download QR codes for shortened links
- 🛡️ Protected routes using **NextAuth sessions** and **middleware.ts**
- 🌐 File-based API routing in Next.js for backend functionality
- 💽 Database management using **Prisma** with **Neon Postgres**
- ⚙️ Smooth **Vercel deployment** with environment configs

---

## 🧠 What I Learned

- How to configure **NextAuth** using both Google and Credentials provider
- How to **extend session and JWT** to include `user.id` via callbacks
- Handling **client vs server components**, especially with `useSearchParams`
- Using `middleware.ts` to protect routes on both frontend and backend
- Fetching sessions using `useSession` on frontend and `getServerSession` on backend
- Prisma schema modeling, migrations, and NeonDB setup
- Solving **TypeScript + Prisma + Vercel deployment** issues

---

## 🛠️ Tech Stack

- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth, Prisma
- **Database:** NeonDB (PostgreSQL)
- **Auth:** Google OAuth + Credentials via NextAuth
- **Hosting:** Vercel

---

## 🖼️ Screenshots
1. Landing Page
   
   ![Landing Page](https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801350/cubmhfnb1rss4vrhap0r.png)

2. Login Page

   <img src="https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801539/zwtt9gvmaexly3pyefes.png" alt="alt text" width="50%" height="50%">

4. Dashboard

   ![Dashboard](https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801614/chz2p5mjx8ywt2pcruhu.png)

5. URL Shortening Form

   ![URL Shortening Form](https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801701/dqrqy0trr1w419gmetwu.png)

6. Short URL + QR Output

    ![QR Output](https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801773/zogewzmu4fcgvasxupgz.png)

7. Prisma Schema

    <img src="https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748801909/llitcfdrvy2dpsisoyxy.png" alt="alt text" width="50%" height="50%">


---

## 🧪 Project Structure

  <img src="https://res.cloudinary.com/dr8ubbrmp/image/upload/v1748802485/dwhj1gcmajbqf1cin24k.png" alt="alt text" width="30%" height="30%">
    
<br/>
<br/>

> ✅ **Highlights**:
- `app/(auth)` — handles sign-in/sign-up routes  
- `app/api` — server-side API routes for auth, CRUD, and redirect logic  
- `app/dashboard/links` — UI for creating, editing, and QR generation  
- `lib/` — utilities for auth and Prisma setup  
- `prisma/` — schema and DB migrations

    
<br/>
<br/>

 ## Made with ❤️ by Aryan Chauhan
