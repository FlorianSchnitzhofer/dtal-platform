import { useState } from 'react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DTAL, Language } from '../types';
import { DTALCard } from './DTALCard';

interface DTALOverviewProps {
  dtals: DTAL[];
  language: Language;
  t: (key: string) => string;
  onSelectDTAL: (dtal: DTAL) => void;
}

export function DTALOverview({ dtals, language, t, onSelectDTAL }: DTALOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(dtals.map(d => language === 'de' ? d.category : d.categoryEn)));

  const filteredDTALs = dtals.filter(dtal => {
    const name = language === 'de' ? dtal.name : dtal.nameEn;
    const description = language === 'de' ? dtal.description : dtal.descriptionEn;
    const category = language === 'de' ? dtal.category : dtal.categoryEn;
    
    const matchesSearch = searchTerm === '' || 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="h-8"
              >
                {language === 'de' ? 'Alle' : 'All'}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="h-8"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl">
            {language === 'de' ? 'Verfügbare Digitale Gesetzeszwillinge' : 'Available Digital Law Twins'}
          </h2>
          <p className="text-muted-foreground">
            {filteredDTALs.length} {language === 'de' ? 'gefunden' : 'found'}
          </p>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          {language === 'de' ? 'DTAL Registrieren' : 'Register DTAL'}
        </Button>
      </div>

      {filteredDTALs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {language === 'de' 
                ? 'Keine digitalen Gesetzeszwillinge gefunden. Versuchen Sie es mit anderen Suchbegriffen.'
                : 'No digital law twins found. Try different search terms.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDTALs.map((dtal) => (
            <DTALCard
              key={dtal.id}
              dtal={dtal}
              language={language}
              onSelect={onSelectDTAL}
            />
          ))}
        </div>
      )}
    </div>
  );
}