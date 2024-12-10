import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure you have your API key set in .env file
});

export async function processUserInput(input) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a task management assistant for a Todo App.' },
        { role: 'user', content: input },
      ],
    });

    const reply = response.choices[0].message.content;
    const extractedTask = extractTaskDetails(reply); // Parse the AI's response
    return { reply, extractedTask };
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return { reply: 'Sorry, I could not process that.', extractedTask: null };
  }
}

function extractTaskDetails(responseText) {
  // Extract details like title, due date, and priority
  const titleMatch = responseText.match(/task: (.*?)(?=,|$)/i);
  const dueDateMatch = responseText.match(/due date: (.*?)(?=,|$)/i);
  const priorityMatch = responseText.match(/priority: (.*?)(?=,|$)/i);

  return {
    title: titleMatch ? titleMatch[1].trim() : null,
    dueDate: dueDateMatch ? dueDateMatch[1].trim() : null,
    priority: priorityMatch ? priorityMatch[1].trim() : null,
  };
}
