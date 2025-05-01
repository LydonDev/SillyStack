import React, { useState } from 'react';
import TemplateCard, { TemplateCardProps } from './TemplateCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter } from 'lucide-react';
import { Badge } from './ui/badge';

// Template data
const templates: TemplateCardProps[] = [
  {
    title: 'SillyStack Default',
    description: 'The perfect starting point for most React projects',
    features: [
      'Vite for lightning-fast builds',
      'React for your UI components',
      'Tailwind CSS for styling',
      'Type-safe with TypeScript'
    ],
    repoUrl: 'https://github.com/lydondev/SillyStack-Default',
    demoUrl: 'https://default.sillystack.dev',
    tags: ['React', 'Tailwind', 'Vite'],
  },
  {
    title: 'SillyStack Hono',
    description: 'Full-stack development with API endpoints',
    features: [
      'Everything in the Default template',
      'Hono backend for API routes',
      'Full-stack TypeScript support',
      'API endpoints with type safety'
    ],
    repoUrl: 'https://github.com/lydondev/SillyStack-Hono',
    demoUrl: 'https://hono.sillystack.dev',
    tags: ['React', 'Hono', 'Full-Stack'],
  },
  {
    title: 'SillyStack Shadcn',
    description: 'Beautiful UI components with Shadcn',
    features: [
      'Everything in the Default template',
      'Shadcn UI for beautiful components',
      'Dark mode support',
      'Accessibility built-in'
    ],
    repoUrl: 'https://github.com/lydondev/SillyStack-Shadcn',
    demoUrl: 'https://shadcn.sillystack.dev',
    tags: ['React', 'Shadcn', 'UI'],
  },
  {
    title: 'SillyStack PWA',
    description: 'Progressive Web App template',
    features: [
      'Everything in the Default template',
      'Service worker configuration',
      'Offline support',
      'Installable on mobile devices'
    ],
    repoUrl: 'https://github.com/lydondev/SillyStack-PWA',
    tags: ['React', 'PWA', 'Mobile'],
  }
];

// Extract all unique tags from templates
const allTags = Array.from(new Set(templates.flatMap(template => template.tags || [])));

const TemplateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter templates based on search term and selected tags
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.every(tag => template.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-2">Filter:</span>
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={selectedTags.includes(tag) ? "bg-silly hover:bg-silly-dark" : "hover:bg-silly/10 cursor-pointer"}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          
          {selectedTags.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={() => setSelectedTags([])}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center">
            <p className="text-muted-foreground">No templates found matching your criteria.</p>
            <Button 
              variant="link" 
              className="text-silly mt-2"
              onClick={() => {
                setSearchTerm('');
                setSelectedTags([]);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateList; 