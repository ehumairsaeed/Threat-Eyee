import React, { useState, useRef, useEffect } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

// Import logo image
import logo from "./assets/logo.png"; // Make sure to put your logo image in the 'assets' folder

export default function ThreatEyee() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      text: "Hey, I just got this message claiming I won a lottery! It asks for my credit card info to claim the prize. What do you think?",
    },
    {
      id: 2,
      type: 'ai',
      risk: true,
      result: {
        type: 'Phishing Scam',
        reason: 'Suspicious financial language and unsolicited prize claim.',
        saferVersion: "Congratulations! You’ve won a prize! To claim it, please contact our customer service team at [legitimate link]. We will never ask for sensitive info via text."
      },
    },
    {
      id: 1,
      type: 'user',
      text: "I’ve attached the updated schedule. Please let me know if any changes are needed.",
    },
    {
      id: 2,
      type: 'ai',
      risk: false,
      result: {
        type: 'None',
        reason: 'No suspicious content detected',
        saferVersion: "I've attached the updated schedule. Please let me know if any changes are needed."
      },
    },
    
  ]);

  const scrollAreaRef = useRef(null);

  // Automatically scroll to the bottom whenever messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScan = async () => {
    try {
      const newUserMessage = {
        id: messages.length + 1,
        type: 'user',
        text: userInput,
      };

      // Update messages to include the new user input
      setMessages([...messages, newUserMessage]);

      // Send the user input to the backend to get the AI response
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await res.json();

      const newAiResponse = {
        id: messages.length + 2,
        type: 'ai',
        risk: data.risk,
        result: {
          type: data.type,
          reason: data.reason,
          saferVersion: data.saferVersion,
        },
      };

      // Add the AI response to the messages
      setMessages((prevMessages) => [...prevMessages, newAiResponse]);
      setUserInput(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error scanning message:', error);
    }
  };

  return (
    <div className="h-screen bg-[#1c1c1c] text-white font-mono">
      {/* Logo and Subtitle */}
      <div className="flex flex-col items-center p-6">
        <img src={logo} alt="Logo" className="h-16 w-auto" /> {/* Logo */}
        <h1 className="text-3xl font-bold mt-4">Threat Eyee</h1> {/* Subtitle */}
        <p className="text-xl mt-2 text-[#00FF00]-900">AI-driven Threat Detection and Analysis</p> {/* Description */}
      </div>

      {/* Conversation area - Display previous messages */}
      <div
        className="flex-1 overflow-y-auto p-4"
        ref={scrollAreaRef}
        style={{ maxHeight: 'calc(100vh - 120px)' }} // Adjusted maxHeight for proper scrolling
      >
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <div className="mb-1 text-sm text-gray-400">
              {msg.type === 'user' ? 'User' : 'Threat Eyee'}
            </div>
            <Card className="bg-black border border-zinc-700">
              <CardContent className="p-4 text-white">
                <p>{msg.text}</p>
                {msg.type === 'ai' && (
                  <div className="mt-3">
                    <div className="flex items-center gap-4 mb-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${msg.risk ? 'bg-red-600' : 'bg-green-600'}`}>
                        {msg.risk ? 'RISK' : 'SAFE'}
                      </span>
                      <span className="text-sm text-white">Type: <span className="font-semibold">{msg.result.type}</span></span>
                    </div>
                    <p className="text-sm text-gray-300">Reason: {msg.result.reason}</p>
                    <p className="text-sm text-gray-300 mt-1">Safer Version: {msg.result.saferVersion}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input area for user */}
      <div className="flex bottom-0 w-full bg-[#1c1c1c] border-t border-green-500 p-6 ">
        <div className="flex items-center w-full">
          <Input
            className="flex-1 bg-[#1c1c1c] text-white border-none focus:outline-none text-lg h-1"  // Larger text field with height and font size
            placeholder="Ask Threat Eyee....."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}style={{ height: '50px' }}
          />
          <Button
            className="ml-2 bg-green-600 hover:bg-green-700 text-white h-16"
            onClick={handleScan}
          >
            Scan Message
          </Button>
        </div>
      </div>
    </div>
  );
}
