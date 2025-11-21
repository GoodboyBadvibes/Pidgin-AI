# Google Gemini Setup Guide

Your app has been migrated from XAI to Google Gemini models with free tier support.

## Step 1: Get Your Gemini API Key

1. Visit: https://ai.google.dev/
2. Click **"Get API Key"** (top right)
3. Create a new API key in Google AI Studio
4. Copy the key

## Step 2: Add API Key to .env

Edit `.env` file and replace:

```
GOOGLE_GENERATIVE_AI_API_KEY="PASTE_YOUR_GEMINI_API_KEY_HERE"
```

With your actual key:

```
GOOGLE_GENERATIVE_AI_API_KEY="your-copied-key-here"
```

## Step 3: Start Dev Server

```powershell
npm run dev
```

## Models Used

- **Chat**: `gemini-2.0-flash` - Fast, multimodal
- **Reasoning**: `gemini-2.0-flash-thinking-exp-01-21` - With extended thinking
- **Title & Artifact**: `gemini-2.0-flash`

## Free Tier Benefits

- Unlimited requests (with rate limits)
- 1,500 free requests per day (up to Dec 2025)
- Great for development & testing

## Rate Limits (Free Tier)

- 15 requests per minute
- 1 million tokens per day
- 32k tokens per request

If you hit limits, you can purchase additional quota on Google Cloud console.
