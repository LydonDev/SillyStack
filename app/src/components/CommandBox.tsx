import React, { useState } from 'react';
import { CopyIcon, CheckIcon, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function CommandBox() {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState('bunx');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${packageManager} sillystack`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg overflow-hidden shadow-lg border border-muted">
        
        <div className="bg-black p-4 font-mono text-sm flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <span className="mr-2">$</span>
            <span className="text-white">{packageManager} sillystack</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={packageManager} onValueChange={setPackageManager}>
              <SelectTrigger className="w-24 h-8 bg-muted/20 border-muted text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bunx">bunx</SelectItem>
                <SelectItem value="npx">npx</SelectItem>
                <SelectItem value="pnpm dlx">pnpm</SelectItem>
                <SelectItem value="yarn dlx">yarn</SelectItem>
              </SelectContent>
            </Select>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 bg-muted/20 hover:bg-muted/40 text-muted-foreground"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}