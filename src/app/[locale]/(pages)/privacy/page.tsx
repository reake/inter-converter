import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, Database, Lock, Globe, CheckCircle } from 'lucide-react';



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2024';

  const privacyPrinciples = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'No Data Collection',
      description: 'We do not collect, store, or transmit any personal data or calculation results.'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'No Tracking',
      description: 'No cookies, analytics, or tracking scripts that monitor your behavior.'
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Local Processing',
      description: 'All calculations happen locally in your browser, never on our servers.'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Secure by Design',
      description: 'Built with privacy and security as core principles from the ground up.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-950 rounded-2xl mb-6">
          <Shield className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your privacy is our priority. Learn how we protect your data and respect your privacy.
        </p>
        <Badge variant="secondary" className="mt-4">
          Last updated: {lastUpdated}
        </Badge>
      </div>

      {/* Privacy Alert */}
      <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>TL;DR:</strong> We don't collect any personal data. All calculations happen in your browser. 
          Your privacy is 100% protected.
        </AlertDescription>
      </Alert>

      {/* Privacy Principles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Privacy Principles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {privacyPrinciples.map((principle, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-green-600 mt-1">{principle.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{principle.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{principle.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Information We Do NOT Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Names, email addresses, or contact information</li>
                  <li>• IP addresses or location data</li>
                  <li>• Device identifiers or browser fingerprints</li>
                  <li>• User accounts or profiles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Data</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Calculation inputs or results</li>
                  <li>• Browsing history or behavior</li>
                  <li>• Search queries or preferences</li>
                  <li>• Analytics or tracking data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How Our Tools Work</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              All InterConverter tools are designed to work entirely in your browser using client-side JavaScript. 
              This means:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Your data never leaves your device
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                No server-side processing or storage
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Tools work offline once loaded
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                No network requests for calculations
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies and Local Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We use minimal local storage only for essential functionality:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Theme Preference:</strong> To remember if you prefer light or dark mode</li>
              <li>• <strong>Language Setting:</strong> To remember your preferred language</li>
              <li>• <strong>No Tracking Cookies:</strong> We do not use any analytics or tracking cookies</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              You can clear this data anytime through your browser settings without affecting functionality.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We minimize third-party dependencies to protect your privacy:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>No Analytics:</strong> No Google Analytics, Facebook Pixel, or similar tracking</li>
              <li>• <strong>No Ads:</strong> No advertising networks or ad tracking</li>
              <li>• <strong>No CDNs:</strong> All resources are served directly from our servers</li>
              <li>• <strong>Currency Data:</strong> Exchange rates are fetched from public APIs without user identification</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Since we don't collect data, there's no data to secure. However, we still implement security best practices:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• HTTPS encryption for all connections</li>
              <li>• Content Security Policy (CSP) headers</li>
              <li>• Regular security updates and monitoring</li>
              <li>• Open-source code for transparency</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Since we don't collect personal data, traditional data rights don't apply. However, you have:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Right to Use:</strong> Free access to all tools without registration</li>
              <li>• <strong>Right to Privacy:</strong> Complete anonymity while using our services</li>
              <li>• <strong>Right to Transparency:</strong> Open-source code and clear privacy practices</li>
              <li>• <strong>Right to Control:</strong> Manage your browser settings and local storage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> privacy@interconverter.com
            </p>
            <p className="text-sm text-gray-500 mt-4">
              We'll respond to privacy inquiries within 48 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
