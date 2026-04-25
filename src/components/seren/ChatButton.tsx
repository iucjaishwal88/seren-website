import { MessageCircle } from 'lucide-react';

export default function ChatButton() {
  return (
    <a
      href="https://poe.com/serenAssistant"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-sage text-warm-white font-sans text-sm font-medium shadow-lg shadow-sage/30 hover:bg-warm-mid hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
      aria-label="Chat with us"
    >
      <MessageCircle size={18} />
      <span>Chat with us 🕯️</span>
    </a>
  );
}
