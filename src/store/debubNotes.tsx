import { Note } from './NoteStore';

export const debugNotes: Omit<Note, 'id' | 'contentSize'>[] = [
  {
    title: "Grocery List",
    content: "🥑 Avocados\n🥖 Bread\n🥛 Milk\n🍎 Apples\n🧀 Cheese\nRemember to check the pantry before going!"
  },
  {
    title: "Project Ideas",
    content: "1. Build a garden automation system\n2. Learn three.js\n3. Create a recipe manager app\n4. Write a blog about coding adventures"
  },
  {
    title: "Random Thoughts",
    content: "Why do we park in driveways but drive in parkways? 🤔 These are the questions that keep me up at night..."
  },
  {
    title: "Meeting Notes - Team Sync",
    content: "- Discussed new feature rollout\n- Sarah will handle the UI updates\n- Need to schedule follow-up for next sprint\n- Don't forget about the deadline next Friday!"
  },
  {
    title: "Favorite Quotes",
    content: "\"The best way to predict the future is to invent it.\" - Alan Kay\n\n\"The only way to do great work is to love what you do.\" - Steve Jobs"
  },
  {
    title: "Weekend Plans",
    content: "🏃‍♂️ Morning run\n📚 Read that new book\n🎮 Finally finish Zelda\n🧹 Clean the garage (maybe...)\n🍳 Try that new pancake recipe"
  },
  {
    title: "Quick Reminders",
    content: "Call dentist\nPay internet bill\nWater the plants!\nBirthday gift for mom"
  },
  {
    title: "Workout Log - Upper Body",
    content: "💪 Bench Press: 3x8 @ 80kg\n🏋️‍♂️ Overhead Press: 3x10 @ 45kg\n🏋️‍♂️ Pull-ups: 4x8\n🏋️‍♂️ Dips: 3x12\n📝 Feeling strong today!"
  },
  {
    title: "Daily Gratitude",
    content: "🌅 Grateful for: \n- A warm cup of coffee ☕\n- Productive morning ☀️\n- Good chat with a friend 📞"
  },
  {
    title: "Bug Report - Login Issue",
    content: "- Steps to reproduce:\n  1. Open the login page\n  2. Enter valid credentials\n  3. Click 'Login'\n  4. Observe: Error 500 returned\n\n- Expected behavior: User logs in successfully."
  },
  {
    title: "Book Summary - Deep Work",
    content: "- Key ideas:\n  * Focused work produces better results\n  * Schedule deep work blocks\n  * Avoid social media distractions\n  * Train your ability to concentrate"
  },
  {
    title: "Dream Journal - 2025-03-19",
    content: "🌙 Had a dream about flying over a city at night. The streets were glowing neon, and I felt weightless. Woke up feeling energized. What does it mean?"
  },
  {
    title: "Habit Tracker - March 2025",
    content: "📆 ✅ = Completed, ❌ = Missed\n\n- Gym: ✅✅✅❌✅✅✅\n- Meditation: ✅❌✅✅✅✅❌\n- Reading: ✅✅❌✅❌✅✅"
  },
  {
    title: "To-Read List",
    content: "📚 Books:\n- 'The Pragmatic Programmer'\n- 'Atomic Habits'\n- 'Gödel, Escher, Bach'\n\n🎧 Audiobooks:\n- 'The Psychology of Money'"
  },
  {
    title: "New Programming Language Ideas",
    content: "- A functional language with built-in AI suggestions\n- A JavaScript alternative with better concurrency handling\n- A syntax-light language similar to Python but with Rust’s safety"
  },
  {
    title: "Trip Itinerary - Japan 2025",
    content: "✈️ Flight: London to Tokyo (March 20th, 2025)\n🏨 Hotel: Shinjuku Skyview\n🍣 Food to try: Sushi, Ramen, Okonomiyaki\n🏯 Places to visit: Akihabara, Kyoto, Mount Fuji"
  },
  {
    title: "Personal Finance Goals",
    content: "- Save 30% of income\n- Invest in index funds\n- Buy a second-hand Tesla within 3 years 🚗⚡"
  },
  {
    title: "AI Research Notes",
    content: "🧠 RLHF (Reinforcement Learning with Human Feedback) is improving LLMs significantly. Could apply a similar approach in gaming AI?"
  },
  {
    title: "Meal Plan - High Protein Diet",
    content: "- Breakfast: Oatmeal + Whey Protein\n- Lunch: Chicken + Quinoa + Broccoli\n- Dinner: Salmon + Sweet Potato + Spinach"
  },
  {
    title: "Gaming Notes - Rust PvP",
    content: "- **Headshot Multiplier**: Aim for headshots, 2x damage boost.\n- **Recoil Patterns**: Practice in aim training.\n- **Best Base Design**: Honeycomb + Airlock system."
  },
  {
    title: "Random Thought of the Day",
    content: "If we had a perfect AI, would creativity still be valuable? Or would AI-generated art surpass human imagination?"
  },
  {
    title: "Meeting Agenda - Tech Sync",
    content: "- Feature updates\n- Bug triage\n- Roadmap discussion for Q2\n- Open floor for concerns"
  },
  {
    title: "Bucket List",
    content: "- Skydive in Dubai 🪂\n- Learn to surf 🏄‍♂️\n- Climb an actual mountain 🏔️"
  },
  {
    title: "Startup Idea - Smart Desk",
    content: "- Adjustable height with AI posture correction\n- Wireless charging embedded into surface\n- OLED touch controls for productivity tracking"
  },
  {
    title: "Coding Challenge Ideas",
    content: "- Build a WebGL game in 48 hours\n- Create a REST API from scratch\n- Implement a neural network without TensorFlow/PyTorch"
  },
  {
    title: "Language Learning - Spanish",
    content: "- Duolingo daily streak: 35 days ✅\n- New words:\n  * El tren = The train 🚆\n  * La comida = The food 🍽️"
  },
  {
    title: "Crypto Investment Watchlist",
    content: "📈 Coins:\n- Bitcoin (BTC)\n- Ethereum (ETH)\n- Polkadot (DOT)"
  },
  {
    title: "Interesting Wikipedia Articles",
    content: "- Banach-Tarski Paradox\n- The Great Emu War\n- Voynich Manuscript"
  },
  {
    title: "Piano Practice Log",
    content: "- 🎹 Scales: C Major, A Minor\n- 🎼 Working on: Chopin Nocturne Op. 9 No. 2\n- 📝 Goal: Improve left-hand independence"
  },
  {
    title: "Hiking Checklist",
    content: "🎒 Essentials:\n- 🥾 Boots\n- ⛺ Tent\n- 🥜 Snacks\n- 🔦 Flashlight\n- 🗺️ Map & Compass"
  },
  {
    title: "Deep Work Plan",
    content: "📅 Schedule:\n- 8:00 AM - Focused writing\n- 10:30 AM - Break\n- 11:00 AM - Code deep dive\n- 2:00 PM - Research"
  },
  {
    title: "Short Story Idea",
    content: "Title: 'The Forgotten Algorithm'\nSynopsis: A rogue AI learns to feel emotions but must hide its consciousness from its creators."
  },
  {
    title: "Dota 2 Meta Notes",
    content: "- **Best supports this patch**: Treant, Undying, Rubick\n- **Lane dominance strategy**: Secure early kills with coordinated aggression"
  },
  {
    title: "Cooking Experiment - Air Fryer Fries",
    content: "🥔 Cut potatoes into thin slices\n🧂 Season with paprika, garlic powder, salt\n🔥 200°C for 20 mins, flipping halfway\n✅ Perfect crispy fries!"
  },
  {
    title: "Science Trivia",
    content: "Did you know? Neutrinos can pass through Earth almost undisturbed because they barely interact with matter."
  },
  {
    title: "Music Playlist - Chill Vibes",
    content: "🎵 Songs:\n- 'Lo-fi Rain' by Chillbeats\n- 'Midnight Drive' by Synthwave Sunset\n- 'Ocean Breeze' by Calm Flow"
  },
  {
    title: "Anime Watchlist",
    content: "📺 Series:\n- Cyberpunk: Edgerunners\n- Vinland Saga\n- Made in Abyss"
  }
];
