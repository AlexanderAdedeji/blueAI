import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST request handler
export async function POST(req: Request) {
    try {
        // Authenticate the user
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse the request body
        const body = await req.json();
        const { messages } = body;
        console.log({ messages });

        // Validate the OpenAI API key
        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not found", {
                status: 500
            });
        }

        // Validate the messages
        if (!messages) {
            return new NextResponse("Messages are required", {
                status: 400
            });
        }

        // Create a completion using OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Assuming "gpt-4" is the correct model name
            messages: messages,
        });

        // Return the response
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
