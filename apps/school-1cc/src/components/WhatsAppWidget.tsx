import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsAppWidgetProps {
  phoneNumber: string;
  defaultMessage?: string;
}

export function WhatsAppWidget({ 
  phoneNumber, 
  defaultMessage = "Bonjour! J'ai une question concernant vos services." 
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-card border border-border rounded-2xl shadow-2xl w-80 overflow-hidden"
          >
            <div className="bg-[#25D366] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Cloud Industrie</h3>
                    <p className="text-white/80 text-sm">Support en ligne</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-[#E5DDD5] min-h-[120px]">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                <p className="text-sm text-gray-800">
                  Bonjour! 👋 Comment pouvons-nous vous aider aujourd'hui?
                </p>
                <span className="text-xs text-gray-500 mt-1 block">
                  Temps de réponse: ~5 min
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-card">
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                onClick={handleOpenWhatsApp}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Démarrer la conversation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}
