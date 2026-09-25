import { NextResponse } from "next/server";
import { processAiCustomerMessage } from "@/lib/services/ai-service";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message text is required." }, { status: 400 });
    }

    const aiResponse = await processAiCustomerMessage(message, history || [], user?.id);

    return NextResponse.json({
      success: true,
      message: aiResponse,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "AI Assistant processing error." },
      { status: 500 }
    );
  }
}
