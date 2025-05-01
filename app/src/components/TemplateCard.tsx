import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';

export interface TemplateCardProps {
  title: string;
  description: string;
  features: string[];
  repoUrl: string;
  demoUrl?: string;
  tags?: string[];
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  features,
  repoUrl,
  demoUrl,
  tags = []
}) => {
  return (
    <Card className="bg-muted border-muted-foreground/10 shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-silly/5 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex gap-2 mb-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-silly/10 text-silly hover:bg-silly/20">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="text-silly mr-2">•</span>
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-silly mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-muted-foreground/10 mt-auto">
        <Button asChild className="w-full sm:flex-1 bg-silly hover:bg-silly-dark">
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </a>
        </Button>
        
        {demoUrl && (
          <Button asChild variant="outline" className="w-full sm:flex-1">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
