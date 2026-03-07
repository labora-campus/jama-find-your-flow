import { Layout } from '@/components/layout/Layout';
import { Sparkles } from 'lucide-react';

const Chat = () => {
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

        {/* Embedded AI Agent */}
        <div className="flex-1">
          <iframe
            src="https://claude.ai/public/artifacts/83262dfa-b110-47db-b0c3-6c18994a59ca"
            className="w-full h-full border-0"
            allow="clipboard-read; clipboard-write"
            title="Jama IA Agent"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
