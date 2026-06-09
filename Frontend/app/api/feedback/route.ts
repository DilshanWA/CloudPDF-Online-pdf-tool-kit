import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
    try{
        const { name, email, message } = await request.json();
        if (!name || !email || !message) {
            return NextResponse.json({ success: false, message: "All fields are required" });
        }

        const country = 
        request.headers.get("x-vercel-ip-country") || "Unknown";

        const deckRef = await db.collection("feedback").add({
            name,
            email,
            message,
            country,
            timestamp: new Date(),
        });

        return NextResponse.json({ 
            success: true, 
            message: "Feedback submitted",
            data: { name, email, message, country },
            deckRef: deckRef.id
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json({ success: false, message: "Failed to submit feedback" });
    }
}