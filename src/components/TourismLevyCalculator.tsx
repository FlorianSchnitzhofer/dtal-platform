import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Calculator, Euro, FileText } from 'lucide-react';
import { CalculationResult, Language } from '../types';
import { municipalities, businessActivities } from '../data/dtals';

interface TourismLevyCalculatorProps {
  language: Language;
  t: (key: string) => string;
}

export function TourismLevyCalculator({ language, t }: TourismLevyCalculatorProps) {
  const [municipality, setMunicipality] = useState('');
  const [businessActivity, setBusinessActivity] = useState('');
  const [revenue, setRevenue] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!municipality) newErrors.municipality = t('validationRequired');
    if (!businessActivity) newErrors.businessActivity = t('validationRequired');
    if (!revenue || parseFloat(revenue) <= 0) {
      newErrors.revenue = !revenue ? t('validationRequired') : t('validationMinAmount');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLevi = async () => {
    if (!validateForm()) return;

    setIsCalculating(true);

    const revenueAmount = parseFloat(revenue);

    try {
      const response = await fetch(
        'https://dtal-tourism-dvhvcqgye0fmeddr.germanywestcentral-01.azurewebsites.net/dtal/calculate_ooetourism_levy',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            municipality_name: municipality,
            business_activity: businessActivity,
            revenue_two_years_ago: revenueAmount
          })
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const baseRate = data.base_rate ?? data.calculation_details?.base_rate ?? 0.003;
      const municipalityMultiplier =
        data.municipality_multiplier ?? data.calculation_details?.municipal_multiplier ?? 1.0;
      const activityMultiplier =
        data.activity_multiplier ?? data.calculation_details?.activity_multiplier ?? 1.0;
      const minAmount = data.minimum_levy ?? data.calculation_details?.minimum_levy ?? 50;
      const finalAmount = data.final_levy ?? data.levy_amount ?? 0;

      const apiResult: CalculationResult = {
        amount: finalAmount,
        currency: data.currency ?? 'EUR',
        breakdown: [
          {
            label: 'Jahresumsatz',
            labelEn: 'Annual Revenue',
            value: `€${revenueAmount.toLocaleString()}`
          },
          {
            label: 'Grundsatz',
            labelEn: 'Base Rate',
            value: `${(baseRate * 100).toFixed(1)}%`
          },
          {
            label: 'Gemeindezuschlag',
            labelEn: 'Municipal Surcharge',
            value: `${((municipalityMultiplier - 1) * 100).toFixed(0)}%`
          },
          {
            label: 'Betriebsart-Faktor',
            labelEn: 'Business Activity Factor',
            value: `${((activityMultiplier - 1) * 100).toFixed(0)}%`
          },
          {
            label: 'Mindestbetrag',
            labelEn: 'Minimum Amount',
            value: `€${minAmount}`
          }
        ],
        lawReferences:
          data.law_references ?? [
            '§ 3 Oö. Tourismusabgabegesetz - Bemessungsgrundlage',
            '§ 4 Oö. Tourismusabgabegesetz - Abgabensatz',
            '§ 5 Oö. Tourismusabgabegesetz - Mindestabgabe'
          ],
        notes:
          data.notes ??
          'Die Berechnung erfolgt auf Basis des Jahresumsatzes von vor zwei Jahren. Der Mindestbetrag von €50 gilt für alle Betriebe. Gemeindezuschläge können variieren.',
        notesEn:
          data.notesEn ??
          'The calculation is based on the annual revenue from two years ago. The minimum amount of €50 applies to all businesses. Municipal surcharges may vary.'
      };

      setResult(apiResult);
    } catch (err) {
      console.error(err);
      alert(language === 'de' ? 'Berechnung fehlgeschlagen' : 'Calculation failed');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t('calculator')}
          </CardTitle>
          <CardDescription>
            {language === 'de' 
              ? 'Geben Sie die erforderlichen Daten ein, um den Tourismusbeitrag zu berechnen.'
              : 'Enter the required data to calculate the tourism levy.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="municipality">{t('municipality')} <span className="text-destructive">*</span></Label>
              <Select value={municipality} onValueChange={setMunicipality}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectMunicipality')} />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((mun) => (
                    <SelectItem key={mun} value={mun}>{mun}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.municipality && (
                <p className="text-sm text-destructive">{errors.municipality}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessActivity">{t('businessActivity')} <span className="text-destructive">*</span></Label>
              <Select value={businessActivity} onValueChange={setBusinessActivity}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectBusinessActivity')} />
                </SelectTrigger>
                <SelectContent>
                  {businessActivities.map((activity) => (
                    <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.businessActivity && (
                <p className="text-sm text-destructive">{errors.businessActivity}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue">{t('annualRevenue')} <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="revenue"
                type="text"
                placeholder={t('enterAmount')}
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="pl-10"
              />
            </div>
            {errors.revenue && (
              <p className="text-sm text-destructive">{errors.revenue}</p>
            )}
          </div>

          <Button 
            onClick={calculateLevi} 
            disabled={isCalculating}
            className="w-full"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                {language === 'de' ? 'Berechnung läuft...' : 'Calculating...'}
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                {t('calculate')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('result')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">{t('amount')}:</span>
                <span className="text-2xl text-primary">
                  €{result.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-3">{t('breakdown')}</h4>
              <div className="space-y-2">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{language === 'de' ? item.label : item.labelEn}:</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3">{t('lawReferences')}</h4>
              <ul className="space-y-1">
                {result.lawReferences.map((ref, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {ref}</li>
                ))}
              </ul>
            </div>

            <Alert>
              <AlertDescription>
                {language === 'de' ? result.notes : result.notesEn}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}