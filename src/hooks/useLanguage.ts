import { useState } from 'react';
import { Language } from '../types';

const translations = {
  de: {
    title: 'DTAL Plattform',
    subtitle: 'Digital Twins of Administrative Law',
    description: 'Plattform für digitale Gesetzeszwillinge - Rechtliche Berechnungen automatisiert und transparent',
    searchPlaceholder: 'Suche nach digitalen Gesetzeszwillingen...',
    category: 'Kategorie',
    jurisdiction: 'Rechtsgebiet',
    lastUpdated: 'Zuletzt aktualisiert',
    version: 'Version',
    calculator: 'Rechner',
    mcpIntegration: 'MCP Integration',
    sourceCode: 'Quellcode',
    calculate: 'Berechnen',
    result: 'Ergebnis',
    lawReferences: 'Gesetzesgrundlagen',
    notes: 'Hinweise',
    mcpTitle: 'MCP Protokoll Integration',
    mcpDescription: 'Anleitung zur Integration des DTAL in AI-Agenten über das Model Context Protocol',
    sourceTitle: 'Open Source Dateien',
    sourceDescription: 'Quellcode und Dokumentation für diesen digitalen Gesetzeszwilling',
    backToOverview: 'Zurück zur Übersicht',
    amount: 'Betrag',
    breakdown: 'Aufschlüsselung',
    parameters: 'Parameter',
    required: 'Pflichtfeld',
    optional: 'Optional',
    municipality: 'Gemeinde',
    businessActivity: 'Betriebsart',
    annualRevenue: 'Jahresumsatz',
    selectMunicipality: 'Gemeinde auswählen...',
    selectBusinessActivity: 'Betriebsart auswählen...',
    enterAmount: 'Betrag eingeben...',
    validationRequired: 'Dieses Feld ist erforderlich',
    validationMinAmount: 'Der Betrag muss größer als 0 sein'
  },
  en: {
    title: 'DTAL Platform',
    subtitle: 'Digital Twins of Administrative Law',
    description: 'Platform for digital law twins - Legal calculations automated and transparent',
    searchPlaceholder: 'Search for digital law twins...',
    category: 'Category',
    jurisdiction: 'Jurisdiction',
    lastUpdated: 'Last updated',
    version: 'Version',
    calculator: 'Calculator',
    mcpIntegration: 'MCP Integration',
    sourceCode: 'Source Code',
    calculate: 'Calculate',
    result: 'Result',
    lawReferences: 'Legal References',
    notes: 'Notes',
    mcpTitle: 'MCP Protocol Integration',
    mcpDescription: 'Guide for integrating this DTAL into AI agents via Model Context Protocol',
    sourceTitle: 'Open Source Files',
    sourceDescription: 'Source code and documentation for this digital law twin',
    backToOverview: 'Back to Overview',
    amount: 'Amount',
    breakdown: 'Breakdown',
    parameters: 'Parameters',
    required: 'Required',
    optional: 'Optional',
    municipality: 'Municipality',
    businessActivity: 'Business Activity',
    annualRevenue: 'Annual Revenue',
    selectMunicipality: 'Select municipality...',
    selectBusinessActivity: 'Select business activity...',
    enterAmount: 'Enter amount...',
    validationRequired: 'This field is required',
    validationMinAmount: 'Amount must be greater than 0'
  }
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
}