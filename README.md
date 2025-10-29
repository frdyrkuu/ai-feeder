# 🌾 AI Feed Reporter 🤖

Welcome to AI Feed Reporter! This is a friendly web app that helps you create the perfect food mix for your farm animals. 🐔🐷🐮

With this tool, you can easily mix and match different ingredients and then get a super-detailed nutritional report, all thanks to the power of AI. It's like having a personal nutritionist for your livestock!

## ✨ Features

- **🥣 Create Custom Mixes:** Dream up any feed mix you want! Just give it a name and list your ingredients and how much of each you're using.
- **📈 Generate AI Reports:** With the click of a button, our AI will analyze your mix and give you a full report, including:
  - A neat table of all your ingredients.
  - A breakdown of important nutrients like calories, protein, and fat.
  - A list of all the vitamins and minerals in the mix.
  - Friendly advice on how to make your mix even better for your animals.
- **💾 Save & View Reports:** All your reports are saved, so you can come back and check them out anytime.
- **📄 Download Reports:** Need a printable version? You can download your reports as both `.docx` (for Microsoft Word) and `.pdf` files.

## 🛠️ Tech Stack

This project is built with some of the most popular and modern technologies in web development:

- **🚀 Framework:** [Next.js](https://nextjs.org/) (The engine of our app)
- **🎨 UI:** [React](https://reactjs.org/) & [Tailwind CSS](https://tailwindcss.com/) (To make it look pretty)
- **🗃️ Database:** [PostgreSQL](https://www.postgresql.org/) (Where we store your mixes and reports)
- **🔗 ORM:** [Prisma](https://www.prisma.io/) (A friendly helper to talk to our database)
- **🧠 AI:** [OpenAI](https://openai.com/) (The brain behind our nutritional reports)
- **📄 File Generation:** [html-to-docx](https://www.npmjs.com/package/html-to-docx) & [html2pdf.js](https://www.npmjs.com/package/html2pdf.js) (To create your downloadable files)

## 🚀 Getting Started

Ready to run the app on your own computer? Here's how:

### ✅ Prerequisites

Make sure you have these installed on your computer:

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [npm](https://www.npmjs.com/) (This comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (Our database)

### ⚙️ Installation

1.  **Clone the repository:**
    This downloads a copy of the project to your computer.

    ```bash
    git clone https://github.com/frdyrkuu/ai-feed-reporter.git
    cd ai-feed-reporter
    ```

2.  **Install dependencies:**
    This installs all the little bits and pieces the project needs to run.

    ```bash
    npm install
    ```

3.  **Set up the database:**
    - First, you'll need to create a new database in PostgreSQL.
    - Then, create a file named `.env` in the main folder of the project and add your database connection details like this:

      ```
      DATABASE_URL="postgresql://user:password@host:port/database"
      ```

4.  **Run the database migrations:**
    This sets up the tables in your new database so the app can use it.

    ```bash
    npx prisma migrate dev
    ```

5.  **Set up the AI provider:**
    - You'll need an API key from [OpenRouter](https://openrouter.ai/). It's free to get started!
    - Add the API key to your `.env` file:

      ```
      OPENROUTER_API_KEY="your-api-key"
      ```

6.  **Run the development server:**
    This starts the app!

    ```bash
    npm run dev
    ```

    You should now be able to see the app running at `http://localhost:3000`.

## 🔌 API Endpoints

The app uses these API endpoints to work its magic. This is more for developers who want to know how the app works under the hood.

### Mixes

- `POST /api/mix`: Creates a new mix.
- `GET /api/mix/list`: Gets a list of all the mixes you've created.

### Reports

- `POST /api/report`: Generates a new nutritional report for a mix.
- `POST /api/report/save`: Saves a report to the database.
- `GET /api/report/[mixId]`: Gets the latest report for a specific mix.
