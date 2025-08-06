# AI Voice Recruiter

AI Voice Recruiter is a web application designed to streamline the initial screening process by conducting automated voice interviews with candidates. It leverages AI to generate interview questions, analyze responses, and provide feedback, saving recruiters time and effort.

## Key Features

*   **AI-Powered Interviews:** Conduct interviews with an AI assistant.
*   **Dynamic Question Generation:** Generate interview questions based on job descriptions.
*   **Voice Interaction:** Candidates can respond to questions using their voice.
*   **Interview Scheduling:** Schedule interviews and share unique links with candidates.
*   **Feedback and Analysis:** Get AI-generated feedback on candidate performance.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Backend & Database:** [Supabase](https://supabase.io/)
*   **AI & Voice:**
    *   [Vapi AI](https://vapi.ai/): For voice-based AI agent interaction.
    *   [OpenAI API](https://openai.com/docs/api-reference/): For generating questions and feedback.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **State Management:** React Hooks & Context API
*   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/ai_voice_recruiter.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Set up environment variables**
    -   Create a `.env.local` file in the root of your project.
    -   Add the necessary environment variables. See `.env.example` for a list of required variables.

4.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the standard Next.js App Router structure.

```
/
├── app/
│   ├── (auth)/           # Authentication routes (e.g., sign in, sign up)
│   ├── (main)/           # Main application routes (e.g., dashboard)
│   ├── api/              # API routes
│   ├── components/       # Shared UI components
│   ├── interview/        # Interview-related pages
│   └── ...
├── components/           # Additional UI components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── services/             # Services for interacting with external APIs (Supabase, OpenAI)
└── ...
```

## API Endpoints

The application uses API routes to handle server-side logic.

*   `POST /api/ai-model`: Generates interview questions based on the provided job details.
    *   **Request Body:** `{ "jobPosition": "string", "jobDescription": "string", "duration": "string", "type": "string" }`
    *   **Response:** `{ "status": 200, "message": { "role": "assistant", "content": "..." } }`
*   `POST /api/ai-feedback`: Analyzes the interview conversation and provides feedback.
    *   **Request Body:** `{ "conversation": "string" }`
    *   **Response:** `{ "status": 200, "message": { "role": "assistant", "content": "..." } }`

## Environment Variables

The following environment variables are required to run the application. Create a `.env.local` file in the root of the project and add the following variables:

*   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project anonymous key.
*   `OPENAI_API_KEY`: Your OpenAI API key.
*   `NEXT_PUBLIC_VAPI_PUBLIC_KEY`: Your Vapi AI public key.

See the `.env.example` file for a template.
