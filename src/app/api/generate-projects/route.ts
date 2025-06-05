import { NextResponse, type NextRequest } from 'next/server';
import { generatePlaceholderProjects, type GeneratePlaceholderProjectsInput } from '@/ai/flows/generate-placeholder-projects';
import { z } from 'zod';

const InputSchema = z.object({
  category: z.string(),
  numProjects: z.coerce.number().min(1).max(5),
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = InputSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid input", details: validationResult.error.format() }, { status: 400 });
    }
    
    const { category, numProjects } = validationResult.data;

    const result = await generatePlaceholderProjects({ category, numProjects });
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error generating placeholder projects:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: "Failed to generate projects", details: errorMessage }, { status: 500 });
  }
}
