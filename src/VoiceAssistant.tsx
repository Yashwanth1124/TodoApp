import { useState, useEffect, useCallback } from 'react';
import VoiceAssistantIcon from './VoiceAssistantIcon'; // Keep this icon as per your existing setup.

function VoiceAssistant() {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [taskDetails, setTaskDetails] = useState<{ title: string; dueDate: string; priority: string }>({
    title: '',
    dueDate: '',
    priority: '',
  });
  const [pendingDetail, setPendingDetail] = useState<'dueDate' | 'priority' | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.onresult = handleVoiceResult;
      recognitionInstance.onerror = handleVoiceError;
      setRecognition(recognitionInstance);
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  }, []);

  // Handle speech recognition results
  const handleVoiceResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Transcript:', transcript);

      if (pendingDetail) {
        // Handle specific questions based on the pending detail
        if (pendingDetail === 'dueDate') {
          setTaskDetails((prev) => ({ ...prev, dueDate: transcript.trim() }));
          setPendingDetail('priority'); // Move to the next question
          speak('Got it. What priority should I set? High, medium, or low?');
        } else if (pendingDetail === 'priority') {
          setTaskDetails((prev) => ({ ...prev, priority: transcript.trim() }));
          setPendingDetail(null); // Clear pending details
          speak('Task details are complete. Sending task to AI for creation.');
          createTask(taskDetails);
        }
      } else if (transcript.includes('add task') || transcript.includes('create task')) {
        const taskTitle = transcript.replace('add task', '').replace('create task', '').trim();
        if (taskTitle) {
          setTaskDetails((prev) => ({ ...prev, title: taskTitle }));
          setPendingDetail('dueDate'); // Start asking for due date
          speak('Task title set. What is the due date?');
        } else {
          speak('What is the task title?');
        }
      } else {
        speak("I didn't understand that. You can say 'Add task' followed by the task title.");
      }
    },
    [pendingDetail, taskDetails]
  );

  // Handle errors during speech recognition
  const handleVoiceError = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech Recognition Error:', event.error);
    speak('There was an error with speech recognition. Please try again.');
  };

  // Text-to-speech helper function
  const speak = (text: string): void => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle listening state
  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };


  // Handle task creation by sending it to the AI backend
  const createTask = async (task: { title: string; dueDate: string; priority: string }): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/askAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: `Create a task with title "${task.title}", due date "${task.dueDate}", and priority "${task.priority}"`,
        }),
      });
      const data = await response.json();

      if (data.response) {
        speak(data.response);
        console.log('AI Response:', data.response);
      } else {
        speak('Task created locally. AI did not respond.');
        console.log('Task created:', task);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      speak('Sorry, there was an issue creating the task.');
    }
  };

  return <VoiceAssistantIcon onActivate={toggleListening} />;
}

export default VoiceAssistant;
