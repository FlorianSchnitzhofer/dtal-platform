import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { DTAL, Language } from '../types';
import { TourismLevyCalculator } from './TourismLevyCalculator';
import { MCPIntegration } from './MCPIntegration';
import { SourceCode } from './SourceCode';

interface DTALDetailProps {
  dtal: DTAL;
  language: Language;
  t: (key: string) => string;
  onBack: () => void;
}

export function DTALDetail({ dtal, language, t, onBack }: DTALDetailProps) {
  const name = language === 'de' ? dtal.name : dtal.nameEn;
  const description = language === 'de' ? dtal.description : dtal.descriptionEn;
  const category = language === 'de' ? dtal.category : dtal.categoryEn;
  const jurisdiction = language === 'de' ? dtal.jurisdiction : dtal.jurisdictionEn;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t('backToOverview')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">v{dtal.version}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{jurisdiction}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {t('lastUpdated')}: {new Date(dtal.lastUpdated).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>MCP Server: {dtal.mcpUrl}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">{t('calculator')}</TabsTrigger>
          <TabsTrigger value="mcp">{t('mcpIntegration')}</TabsTrigger>
          <TabsTrigger value="source">{t('sourceCode')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="mt-6">
          {dtal.id === 'ooe-tourism-levy' ? (
            <TourismLevyCalculator language={language} t={t} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  {language === 'de' 
                    ? 'Rechner für diesen DTAL wird bald verfügbar sein.'
                    : 'Calculator for this DTAL will be available soon.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="mcp" className="mt-6">
          <MCPIntegration mcpUrl={dtal.mcpUrl} language={language} t={t} />
        </TabsContent>
        
        <TabsContent value="source" className="mt-6">
          <SourceCode language={language} t={t} />
        </TabsContent>
      </Tabs>
    </div>
  );
}