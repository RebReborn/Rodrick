// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates placeholder project details for the 'Future Projects' section of the portfolio.
 *
 * - generatePlaceholderProjects - A function that generates placeholder project details.
 * - GeneratePlaceholderProjectsInput - The input type for the generatePlaceholderProjects function.
 * - GeneratePlaceholderProjectsOutput - The return type for the generatePlaceholderProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlaceholderProjectsInputSchema = z.object({
  category: z
    .string()
    .describe("The category of future projects to generate placeholders for, such as 'Mobile App Development', 'AI Projects', etc."),
  numProjects: z
    .number()
    .describe('The number of placeholder projects to generate for the specified category.'),
});
export type GeneratePlaceholderProjectsInput = z.infer<typeof GeneratePlaceholderProjectsInputSchema>;

const GeneratePlaceholderProjectsOutputSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().describe('The title of the placeholder project.'),
      description: z.string().describe('A brief description of the placeholder project.'),
      technologyStack: z.array(z.string()).describe('The technology stack used in the project.'),
      imagePrompt: z.string().describe('A prompt to generate a representative image for the project'),
    })
  ).describe('An array of placeholder project details.'),
});
export type GeneratePlaceholderProjectsOutput = z.infer<typeof GeneratePlaceholderProjectsOutputSchema>;

export async function generatePlaceholderProjects(
  input: GeneratePlaceholderProjectsInput
): Promise<GeneratePlaceholderProjectsOutput> {
  return generatePlaceholderProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlaceholderProjectsPrompt',
  input: {schema: GeneratePlaceholderProjectsInputSchema},
  output: {schema: GeneratePlaceholderProjectsOutputSchema},
  prompt: `You are a creative portfolio curator assisting in the creation of placeholder content for future projects.

  Generate {{numProjects}} placeholder projects for the category '{{category}}'. Each project should have a title, a brief description, a technology stack (as an array of strings), and a prompt to generate a representative image for the project.

  Ensure the project details are realistic and engaging, suitable for a portfolio showcasing future work.
  `,
});

const generatePlaceholderProjectsFlow = ai.defineFlow(
  {
    name: 'generatePlaceholderProjectsFlow',
    inputSchema: GeneratePlaceholderProjectsInputSchema,
    outputSchema: GeneratePlaceholderProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
