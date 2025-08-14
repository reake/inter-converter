import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'January 1, 2024';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-950 rounded-2xl mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Simple, fair terms for using InterConverter's free conversion tools and calculators.
        </p>
        <Badge variant="secondary" className="mt-4">
          Last updated: {lastUpdated}
        </Badge>
      </div>

      {/* Summary Alert */}
      <Alert className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Simple Terms:</strong> Use our tools freely and responsibly. We provide them "as-is" 
          without warranties. Don't abuse the service or violate laws.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              By accessing and using InterConverter ("the Service"), you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
            <p className="text-gray-600">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use License</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily use InterConverter for personal and commercial purposes. 
              This is the grant of a license, not a transfer of title, and under this license you may:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Use all conversion tools and calculators freely
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Access the service from any device or location
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Share links to specific tools with others
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                Use results for personal or commercial projects
              </li>
            </ul>
            <p className="text-gray-600">
              This license shall automatically terminate if you violate any of these restrictions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You may not use InterConverter for any unlawful purpose or to solicit others to perform 
              unlawful acts. You may not:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Attempt to gain unauthorized access to our systems</li>
              <li>• Use automated scripts to overload our servers</li>
              <li>• Reverse engineer or copy our code without permission</li>
              <li>• Use the service to violate any applicable laws or regulations</li>
              <li>• Attempt to interfere with other users' access to the service</li>
              <li>• Use the service for any fraudulent or malicious activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy and Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              While we strive for accuracy in all our tools and calculations:
            </p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li>• We cannot guarantee 100% accuracy for all calculations</li>
              <li>• Exchange rates and data may not be real-time</li>
              <li>• You should verify critical calculations independently</li>
              <li>• We are not responsible for decisions made based on our results</li>
            </ul>
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> Always verify critical calculations independently, 
                especially for financial, engineering, or safety-critical applications.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We aim to provide reliable service, but:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Service may be temporarily unavailable for maintenance</li>
              <li>• We do not guarantee 100% uptime</li>
              <li>• Features may be added, modified, or removed at any time</li>
              <li>• We reserve the right to limit usage if necessary</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              The information on this website is provided on an "as is" basis. To the fullest extent 
              permitted by law, this Company:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Excludes all representations and warranties relating to this website and its contents</li>
              <li>• Excludes all liability for damages arising out of or in connection with your use of this website</li>
              <li>• Does not warrant that the website will be constantly available or available at all</li>
              <li>• Does not warrant that the information will be complete, true, accurate, or non-misleading</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              In no event shall InterConverter or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on InterConverter's website, 
              even if InterConverter or an authorized representative has been notified orally or in 
              writing of the possibility of such damage. Because some jurisdictions do not allow 
              limitations on implied warranties, or limitations of liability for consequential or 
              incidental damages, these limitations may not apply to you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your privacy is important to us. Please review our Privacy Policy, which also governs 
              your use of the Service, to understand our practices. We do not collect personal data 
              and all calculations are performed locally in your browser.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              InterConverter may revise these terms of service at any time without notice. By using 
              this website, you are agreeing to be bound by the then current version of these terms 
              of service. We will update the "Last updated" date at the top of this page when changes 
              are made.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws 
              of the jurisdiction where InterConverter operates, and you irrevocably submit to the 
              exclusive jurisdiction of the courts in that state or location.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> legal@interconverter.com
            </p>
            <p className="text-sm text-gray-500 mt-4">
              We'll respond to legal inquiries within 5 business days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
