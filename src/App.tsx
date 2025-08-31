import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Scale, Globe, Code2 } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import { LanguageToggle } from './components/LanguageToggle';
import { DTALOverview } from './components/DTALOverview';
import { DTALDetail } from './components/DTALDetail';
import { DTAL } from './types';
import { dtals } from './data/dtals';

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedDTAL, setSelectedDTAL] = useState<DTAL | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Scale className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl">{t('title')}</h1>
                  <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedDTAL ? (
          <DTALDetail
            dtal={selectedDTAL}
            language={language}
            t={t}
            onBack={() => setSelectedDTAL(null)}
          />
        ) : (
          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Globe className="h-6 w-6" />
                  {t('title')}
                </CardTitle>
                <CardDescription className="text-lg">
                  {t('description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'de' ? 'Verfügbare DTALs' : 'Available DTALs'}
                      </p>
                      <p className="text-lg">{dtals.length}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'de' ? 'Open Source' : 'Open Source'}
                      </p>
                      <Badge variant="secondary">MIT License</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'de' ? 'MCP Protokoll' : 'MCP Protocol'}
                      </p>
                      <Badge variant="outline">AI-Ready</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DTALOverview
              dtals={dtals}
              language={language}
              t={t}
              onSelectDTAL={setSelectedDTAL}
            />
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-primary" />
                <span className="text-lg">DTAL Platform</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'de' 
                  ? 'Digitale Gesetzeszwillinge für transparente und automatisierte Rechtsberechnungen.'
                  : 'Digital law twins for transparent and automated legal calculations.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="mb-4">{language === 'de' ? 'Kategorien' : 'Categories'}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{language === 'de' ? 'Tourismus & Freizeit' : 'Tourism & Leisure'}</li>
                <li>{language === 'de' ? 'Steuer & Abgaben' : 'Tax & Levies'}</li>
                <li>{language === 'de' ? 'Sozialversicherung' : 'Social Security'}</li>
                <li>{language === 'de' ? 'Baurecht' : 'Building Law'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">{language === 'de' ? 'Entwickler' : 'Developers'}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>MCP Integration Guide</li>
                <li>API Documentation</li>
                <li>Open Source Repository</li>
                <li>Community Forum</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 DTAL Platform. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}