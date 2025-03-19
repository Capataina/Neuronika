import { Note } from './NoteStore';

export const debugNotes: Omit<Note, 'id'>[] = [
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
  }
];
