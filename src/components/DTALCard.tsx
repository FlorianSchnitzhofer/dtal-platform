import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { DTAL, Language } from '../types';

interface DTALCardProps {
  dtal: DTAL;
  language: Language;
  onSelect: (dtal: DTAL) => void;
}

export function DTALCard({ dtal, language, onSelect }: DTALCardProps) {
  const name = language === 'de' ? dtal.name : dtal.nameEn;
  const description = language === 'de' ? dtal.description : dtal.descriptionEn;
  const category = language === 'de' ? dtal.category : dtal.categoryEn;
  const jurisdiction = language === 'de' ? dtal.jurisdiction : dtal.jurisdictionEn;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelect(dtal)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {description}
            </CardDescription>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline">v{dtal.version}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{jurisdiction}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(dtal.lastUpdated).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}