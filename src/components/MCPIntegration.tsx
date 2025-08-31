import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Copy, ExternalLink, Code, Terminal } from 'lucide-react';
import { Language } from '../types';

interface MCPIntegrationProps {
  mcpUrl: string;
  language: Language;
  t: (key: string) => string;
}

export function MCPIntegration({ mcpUrl, language, t }: MCPIntegrationProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const configExample = `{
  "mcpServers": {
    "ooe-tourism-levy": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fetch"],
      "env": {
        "FETCH_BASE_URL": "${mcpUrl}"
      }
    }
  }
}`;

  const pythonExample = `import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def use_tourism_levy():
    server_params = StdioServerParameters(
        command="npx",
        args=["@modelcontextprotocol/server-fetch"],
        env={"FETCH_BASE_URL": "${mcpUrl}"}
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # Call the tourism levy calculation
            result = await session.call_tool(
                "calculate_tourism_levy",
                {
                    "municipality_name": "Linz",
                    "business_activity": "Hotel",
                    "revenue_two_years_ago": 250000
                }
            )
            
            print(result)

# Run the example
asyncio.run(use_tourism_levy())`;

  const nodejsExample = `const { Client } = require('@modelcontextprotocol/client');

async function calculateTourismLevy() {
  const client = new Client({
    name: "tourism-levy-client",
    version: "1.0.0"
  });

  try {
    await client.connect({
      command: "npx",
      args: ["@modelcontextprotocol/server-fetch"],
      env: { FETCH_BASE_URL: "${mcpUrl}" }
    });

    const result = await client.callTool("calculate_tourism_levy", {
      municipality_name: "Linz",
      business_activity: "Hotel", 
      revenue_two_years_ago: 250000
    });

    console.log("Tourism levy calculation:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.disconnect();
  }
}

calculateTourismLevy();`;

  const curlExample = `curl -X POST "${mcpUrl}/tools/calculate_tourism_levy" \\
  -H "Content-Type: application/json" \\
  -d '{
    "municipality_name": "Linz",
    "business_activity": "Hotel",
    "revenue_two_years_ago": 250000
  }'`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {t('mcpTitle')}
          </CardTitle>
          <CardDescription>
            {t('mcpDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">MCP Server URL:</span>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mcpUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <code className="text-sm bg-background rounded px-2 py-1 block overflow-x-auto">
              {mcpUrl}
            </code>
          </div>
          
          <div className="grid gap-4">
            <Badge variant="outline" className="w-fit">
              <ExternalLink className="h-3 w-3 mr-1" />
              Model Context Protocol
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'Konfiguration' : 'Configuration'}
          </CardTitle>
          <CardDescription>
            {language === 'de' 
              ? 'MCP Server Konfiguration für AI-Agenten'
              : 'MCP Server configuration for AI agents'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4>Claude Desktop Config</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(configExample)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{configExample}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            {language === 'de' ? 'Code Beispiele' : 'Code Examples'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4>Python</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(pythonExample)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{pythonExample}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4>Node.js</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nodejsExample)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{nodejsExample}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4>cURL</h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(curlExample)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">
              <code>{curlExample}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'de' ? 'API Schema' : 'API Schema'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4>{language === 'de' ? 'Funktionsparameter' : 'Function Parameters'}</h4>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm">
{`{
  "name": "calculate_tourism_levy",
  "description": "Calculate the Upper Austrian tourism levy",
  "inputSchema": {
    "type": "object",
    "properties": {
      "municipality_name": {
        "type": "string",
        "description": "Municipality where the business operates"
      },
      "business_activity": {
        "type": "string", 
        "description": "Description of the business activity"
      },
      "revenue_two_years_ago": {
        "type": "number",
        "description": "Annual revenue from two years ago in EUR"
      }
    },
    "required": ["municipality_name", "business_activity", "revenue_two_years_ago"]
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}