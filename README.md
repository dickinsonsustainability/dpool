# **DPool - Ride Sharing for Dickinson College**  
🚗 **DPool** is a ride-sharing platform designed for Dickinson College students to coordinate carpooling efficiently.

## **🚀 Features**
- 📍 **Find & Offer Rides** – Users can post or search for available rides.
- 🗺️ **Google Maps Integration** – View and plan routes conveniently.
- 🕒 **Real-time Updates** – Stay informed on ride availability and schedules.
- 🔒 **Secure Authentication** – Uses Clerk for authentication & authorization.
- 🗄️ **Database Management** – Powered by Supabase for real-time data handling.

## **🛠️ Tech Stack**
- **Frontend:** Next.js, Tailwind CSS, shadcn/ui  
- **Backend:** Node.js, Supabase  
- **Authentication:** Clerk  
- **Hosting:** Vercel  

## **📦 Installation & Setup**
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/dickinsonsustainability/dpool.git](https://github.com/dickinsonsustainability/dpool.git)
   cd carpool-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables** (Create a `.env.local` file and add Supabase & Clerk keys):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open in browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## **📝 How to Use**
1. **Sign up/log in** with your Dickinson College email.
2. **Post a ride** with details like pickup/drop-off location, date and time, available seats, price, and message.
3. **Search for rides** that match your schedule and request to join.
4. **Coordinate with the driver** through email.

## **🔧 Future Improvements**
- ✅ Ride confirmation system    
- ✅ Ride history and user ratings  

## **📜 License**
MIT License.

## **🤝 Contributing**
We welcome contributions! Open an issue or submit a pull request.

## **📬 Contact**
For questions or suggestions, reach out at vuthutrang801@gmail.com.
