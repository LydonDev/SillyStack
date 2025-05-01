import CommandBox from '../../components/CommandBox';
import { Github } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="container flex justify-between items-center">
        <div className="font-bold text-xl">Silly<span className="text-silly">Stack</span></div>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/lydondev/SillyStack" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </header>

      <main className="flex-1">
        <section className="container py-16 md:py-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              The <span className="text-gradient underline-gradient">Silly</span> way to build web apps
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              A modern, open-source toolkit that helps you build web applications faster.
            </p>
            
            <CommandBox />
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button asChild className="gap-2" variant="outline">
                <a href="https://github.com/lydondev/SillyStack">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Open Source <span className="text-gradient">All The Way</span></h2>
            <p className="text-muted-foreground mb-8">
              Silly Stack is fully open-source and maintained by the community. Feel free to contribute, report issues, or suggest improvements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2" variant="outline">
                <a href="https://github.com/lydondev/SillyStack">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-8">
        <div className="container text-center text-muted-foreground">
          <p>Developed and maintained with <span className="text-silly">❤</span> by <a href="https://github.com/lydondev" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-silly transition-colors">Lydon</a></p>
        </div>
      </footer>
    </div>
  );
};
