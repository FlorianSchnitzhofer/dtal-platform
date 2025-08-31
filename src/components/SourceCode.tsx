import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Github, FileCode, Book, Copy, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface SourceCodeProps {
  language: Language;
  t: (key: string) => string;
}

export function SourceCode({ language, t }: SourceCodeProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const dockerFile = `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`;

  const requirementsTxt = `fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
mcp==1.0.0
python-multipart==0.0.6`;

  const mainPy = `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging

app = FastAPI(
    title="Upper Austrian Tourism Levy Calculator",
    description="Digital Twin for calculating tourism levy in Upper Austria",
    version="1.0.0"
)

class TourismLevyRequest(BaseModel):
    municipality_name: str
    business_activity: str
    revenue_two_years_ago: float

class TourismLevyResponse(BaseModel):
    levy_amount: float
    currency: str
    calculation_details: Dict[str, Any]
    law_references: list[str]

@app.post("/calculate", response_model=TourismLevyResponse)
async def calculate_tourism_levy(request: TourismLevyRequest):
    """Calculate the Upper Austrian tourism levy."""
    try:
        # Base rate: 0.3% of revenue
        base_rate = 0.003
        
        # Municipal multiplier
        municipal_multiplier = 1.2 if "Linz" in request.municipality_name else 1.0
        
        # Business activity multiplier
        activity_multiplier = {
            "Hotel": 1.5,
            "Restaurant": 1.2,
            "Café": 1.1,
            "Retail": 1.0
        }.get(request.business_activity, 1.0)
        
        # Calculate levy
        calculated_amount = (
            request.revenue_two_years_ago * 
            base_rate * 
            municipal_multiplier * 
            activity_multiplier
        )
        
        # Minimum levy
        min_levy = 50.0
        final_amount = max(calculated_amount, min_levy)
        
        return TourismLevyResponse(
            levy_amount=final_amount,
            currency="EUR",
            calculation_details={
                "base_rate": base_rate,
                "municipal_multiplier": municipal_multiplier,
                "activity_multiplier": activity_multiplier,
                "minimum_levy": min_levy,
                "calculated_before_minimum": calculated_amount
            },
            law_references=[
                "§ 3 Oö. Tourismusabgabegesetz - Bemessungsgrundlage",
                "§ 4 Oö. Tourismusabgabegesetz - Abgabensatz",
                "§ 5 Oö. Tourismusabgabegesetz - Mindestabgabe"
            ]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}`;

  const files = [
    {
      name: 'main.py',
      description: language === 'de' ? 'Hauptanwendung mit FastAPI' : 'Main application with FastAPI',
      content: mainPy,
      language: 'python'
    },
    {
      name: 'Dockerfile',
      description: language === 'de' ? 'Docker Container Konfiguration' : 'Docker container configuration',
      content: dockerFile,
      language: 'dockerfile'
    },
    {
      name: 'requirements.txt',
      description: language === 'de' ? 'Python Abhängigkeiten' : 'Python dependencies',
      content: requirementsTxt,
      language: 'text'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            {t('sourceTitle')}
          </CardTitle>
          <CardDescription>
            {t('sourceDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Github className="h-3 w-3 mr-1" />
                Open Source
              </Badge>
              <Badge variant="outline">MIT License</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {language === 'de' ? 'Download ZIP' : 'Download ZIP'}
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.map((file, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{file.name}</CardTitle>
                <CardDescription>{file.description}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(file.content)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto max-h-96">
              <code className={`language-${file.language}`}>
                {file.content}
              </code>
            </pre>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            {language === 'de' ? 'Deployment Anleitung' : 'Deployment Guide'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4>{language === 'de' ? 'Lokale Entwicklung' : 'Local Development'}</h4>
              <div className="bg-muted rounded-lg p-4 mt-2">
                <pre className="text-sm">
{`# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn main:app --reload --port 8000

# Server will be available at http://localhost:8000`}
                </pre>
              </div>
            </div>

            <div>
              <h4>Docker</h4>
              <div className="bg-muted rounded-lg p-4 mt-2">
                <pre className="text-sm">
{`# Build the Docker image
docker build -t tourism-levy-calculator .

# Run the container
docker run -p 8000:8000 tourism-levy-calculator

# Server will be available at http://localhost:8000`}
                </pre>
              </div>
            </div>

            <div>
              <h4>{language === 'de' ? 'Azure Deployment' : 'Azure Deployment'}</h4>
              <div className="bg-muted rounded-lg p-4 mt-2">
                <pre className="text-sm">
{`# Login to Azure
az login

# Create resource group
az group create --name tourism-levy-rg --location germanywestcentral

# Deploy container app
az containerapp create \\
  --name tourism-levy-app \\
  --resource-group tourism-levy-rg \\
  --environment tourism-levy-env \\
  --image tourism-levy-calculator \\
  --target-port 8000 \\
  --ingress external`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}