# Interest.ing 📈✨
*In your best interest.*

> An intuitive, modern financial tool suite providing interactive compound interest, savings plan, and retirement calculators with smart scenario saving and real-time visualization.

---

## **About the Project**
**Interest.ing** is a high-end, user-centric financial planning web application built as a Capstone project for the SPICED Academy web development bootcamp. It bridges the gap between cold, intimidating financial tables and modern, accessible UI/UX design (featuring a sleek aesthetic). 

Unlike traditional calculators that force you to re-enter data and lose your progress on refresh, Interest.ing offers persistent scenario management, a unified global state, and real-time visual feedback via fluid charting.

---

## **Key Features**
* **The Financial Suite (3 Core Calculators):**
  * **Compound Interest Calculator (Zinseszins):** The primary engine demonstrating long-term exponential wealth growth.
  * **Savings Plan Calculator (Sparziel):** Reverse-engineers how much you need to save monthly to reach a specific financial goal.
  * **Retirement Gap Calculator (Rentenlücke):** Calculates your expected retirement income against your current lifestyle to identify and solve your pension gap.
* **Global State Sync:** Seamlessly switch between different calculators without losing your core inputs (Initial Capital, Monthly Rate, Duration, Interest Rate).
* **Smart Scenario CRUD:** Save, update, and delete your financial scenarios directly to a MongoDB database.
* **Side-by-Side Scenario Comparison:** Load multiple saved scenarios into the same chart to compare strategies (e.g., 100€ vs. 300€ monthly savings).
* **Interactive Data Visualization:** Powered by **Recharts**, featuring smooth, stacked area charts that map out principal vs. interest over time.
* **Progressive AI Enhancements (Nice-to-haves)-Optional:** 
  * *Jargon-Buster ✨:* On-demand beginner-friendly explanations using driving school analogies.
  * *Automated Scenario Naming ✨:* Smart generation of descriptive titles based on user inputs upon saving.
  * *AI-Driven Assessment (Die Einschätzung) ✨:* Intelligent analysis of the user's inputs, pointing out blind spots (like inflation risks or low savings rates) and giving constructive guidance.
  * *Future-Self Vision ✨:* Emotional, text-based storytelling generated from your final data points.

---

## **Tech Stack**
* **Framework:** Next.js (App Router)
* **Styling & UI:** Tailwind CSS, Framer Motion (for smooth transitions)
* **State Management:** Zustand
* **Database & ORM:** MongoDB Atlas & Mongoose
* **Data Visualization:** Recharts
* **Deployment:** Vercel

---

## **Getting Started (Local Development)**

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/greg-motion-dev/interest-ing.git](https://github.com/greg-motion-dev/interest-ing.git)
   cd interest-ing
