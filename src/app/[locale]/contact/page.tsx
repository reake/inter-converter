import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Github, 
  Twitter, 
  Bug, 
  Lightbulb, 
  HelpCircle,
  Clock,
  Globe,
  Shield
} from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      description: 'Get help with technical issues or general questions',
      contact: 'support@interconverter.com',
      responseTime: '24-48 hours',
      action: 'mailto:support@interconverter.com'
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: 'Bug Reports',
      description: 'Report bugs or technical issues',
      contact: 'bugs@interconverter.com',
      responseTime: '12-24 hours',
      action: 'mailto:bugs@interconverter.com'
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Feature Requests',
      description: 'Suggest new tools or improvements',
      contact: 'features@interconverter.com',
      responseTime: '2-5 days',
      action: 'mailto:features@interconverter.com'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacy & Legal',
      description: 'Privacy concerns or legal matters',
      contact: 'legal@interconverter.com',
      responseTime: '5 business days',
      action: 'mailto:legal@interconverter.com'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      name: 'GitHub',
      description: 'View source code and contribute',
      url: 'https://github.com/interconverter',
      handle: '@interconverter'
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: 'Twitter',
      description: 'Follow for updates and announcements',
      url: 'https://twitter.com/interconverter',
      handle: '@interconverter'
    }
  ];

  const faqItems = [
    {
      question: 'How do I report a calculation error?',
      answer: 'Email us at bugs@interconverter.com with the specific tool, input values, expected result, and actual result.'
    },
    {
      question: 'Can I request a new conversion tool?',
      answer: 'Yes! Send your suggestions to features@interconverter.com. Include details about what you need and how it would be useful.'
    },
    {
      question: 'Is my data safe when using the tools?',
      answer: 'Absolutely. All calculations happen in your browser. We don\'t collect, store, or transmit any of your data.'
    },
    {
      question: 'Can I use these tools for commercial purposes?',
      answer: 'Yes, all tools are free for both personal and commercial use. Just verify critical calculations independently.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6">
          <MessageSquare className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're here to help! Whether you have questions, found a bug, or want to suggest improvements, 
          we'd love to hear from you.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg mb-4 text-blue-600">
                  {method.icon}
                </div>
                <h3 className="font-semibold mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                <div className="space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={method.action}>{method.contact}</a>
                  </Button>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {method.responseTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Follow Us</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {socialLinks.map((social, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-blue-600">{social.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{social.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{social.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.handle}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Response Time Info */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">12-24h</div>
              <div className="text-sm text-gray-600">Bug Reports</div>
              <div className="text-xs text-gray-500">Critical issues prioritized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">24-48h</div>
              <div className="text-sm text-gray-600">General Support</div>
              <div className="text-xs text-gray-500">Technical questions & help</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">2-5 days</div>
              <div className="text-sm text-gray-600">Feature Requests</div>
              <div className="text-xs text-gray-500">Suggestions & improvements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Global Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We provide support in multiple languages and time zones. While our primary 
              support language is English, we can assist in other languages when possible.
            </p>
            <Badge variant="secondary">24/7 Email Support</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Privacy Commitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              When you contact us, we only collect the information you provide. We don't 
              track or store any additional data about your usage of our tools.
            </p>
            <Badge variant="secondary">Privacy Protected</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
