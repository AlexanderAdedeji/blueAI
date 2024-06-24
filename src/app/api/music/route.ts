import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Initialize OpenAI with the API key
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
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
        const { prompt } = body;
        console.log({ prompt });


        // Validate the prompt
        if (!prompt) {
            return new NextResponse("Messages are required", {
                status: 400
            });
        }

        // Create a completion using OpenAI
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                alpha: 0.5,
                prompt_a: prompt,
                prompt_b: "90's rap",
                denoising: 0.75,
                seed_image_id: "vibes",
                num_inference_steps: 50
              }
            }
          );
          console.log(response);

        // Return the response
        return NextResponse.json(response);
    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
