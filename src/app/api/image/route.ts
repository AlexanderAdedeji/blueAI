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
        const { prompt, amount = 1, resolution = "512x512" } = body;


        // Validate the OpenAI API key
        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not found", {
                status: 500
            });
        }

        // Validate the messages
        if (!prompt) {
            return new NextResponse("Messages are required", {
                status: 400
            });
        }
        if (!amount) {
            return new NextResponse("Messages are required", {
                status: 400
            });
        }

        if (!resolution) {
            return new NextResponse("Messages are required", {
                status: 400
            });
        }
        // Create a completion using OpenAI
        const response = await openai.images.generate({

            prompt,
            n: parseInt(amount, 10), size: resolution,
        });

        console.log(response)

        // Return the response
        return NextResponse.json(response.data);
    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
