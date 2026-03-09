import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { CafeCard } from '@/components/cafeteria/CafeCard';
import { cafeterias, type Cafeteria } from '@/data/cafeterias';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  cafes?: Cafeteria[];
}

const mockResponses: { keywords: string[]; response: string; cafes: string[] }[] = [
  {
    keywords: ['palermo', 'silencioso', 'tranquilo', 'quiet'],
    response: '¡Perfecto! Para trabajar tranquilo en Palermo, te recomiendo estos lugares:',
    cafes: ['cafe-palermo', 'lab-coffee'],
  },
  {
    keywords: ['wifi', 'rápido', 'rapido', 'velocidad', 'internet'],
    response: 'Si necesitás WiFi ultra rápido, estos son los mejores:',
    cafes: ['lab-coffee', 'lattente', 'cuervo-cafe'],
  },
  {
    keywords: ['barato', 'económico', 'economico', 'precio'],
    response: 'Para trabajar sin gastar mucho, mirá estas opciones accesibles:',
    cafes: ['birkin-coffee', 'origenes'],
  },
  {
    keywords: ['descuento', 'oferta', 'promoción', 'promocion'],
    response: '¡Estos lugares tienen descuentos exclusivos para usuarios de Jama!',
    cafes: ['cafe-palermo', 'lattente', 'cuervo-cafe', 'lab-coffee'],
  },
  {
    keywords: ['enchufes', 'enchufe', 'cargar', 'laptop'],
    response: 'Estos cafés tienen muchos enchufes para que trabajes cómodo:',
    cafes: ['lattente', 'cuervo-cafe', 'lab-coffee', 'full-city-coffee'],
  },
];

const getAIResponse = async (userMessage: string): Promise<{ response: string; cafes: Cafeteria[] }> => {
  try {
    const res = await fetch('https://brandoncandia.app.n8n.cloud/webhook/JamitoCoffe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    const responseText = typeof data === 'string' ? data : (data.response || data.message || data.output || JSON.stringify(data));
    
    // Try to match cafes from the response
    const lowerResponse = responseText.toLowerCase();
    const matchedCafes = cafeterias.filter(c => lowerResponse.includes(c.name.toLowerCase()));
    
    return { response: responseText, cafes: matchedCafes };
  } catch (error) {
    console.error('Webhook error:', error);
    return { response: 'Lo siento, hubo un error al procesar tu mensaje. Intentá de nuevo.', cafes: [] };
  }
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy Jama 👋 Contame qué tipo de espacio necesitás para trabajar hoy. Podés decirme la zona, si necesitás WiFi rápido, un lugar tranquilo, o cualquier preferencia.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Send to webhook
    setTimeout(async () => {
      const { response, cafes } = await getAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        cafes: cafes.length > 0 ? cafes : undefined,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 0);
  };

  const quickQuestions = [
    'Necesito WiFi rápido en Palermo',
    'Buscá un lugar silencioso para trabajar',
    'Quiero cafeterías con descuentos',
    'Lugares con enchufes para laptop',
  ];

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Jama IA</h1>
                <p className="text-xs text-muted-foreground">Tu asistente para encontrar cafeterías</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 animate-fade-in',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'assistant' ? 'bg-primary/20' : 'bg-secondary'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[85%] md:max-w-[70%]',
                    message.role === 'user' ? 'text-right' : ''
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-2.5',
                      message.role === 'assistant'
                        ? 'bg-card border border-border'
                        : 'bg-primary text-primary-foreground'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.cafes && message.cafes.length > 0 && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {message.cafes.map((cafe) => (
                        <CafeCard key={cafe.id} cafe={cafe} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick questions */}
        {messages.length === 1 && (
          <div className="border-t border-border bg-card/30">
            <div className="container mx-auto px-4 py-3">
              <p className="text-xs text-muted-foreground mb-2">Probá preguntando:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ej: Necesito un lugar tranquilo en Palermo con buen WiFi..."
                className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-xl" disabled={!input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
