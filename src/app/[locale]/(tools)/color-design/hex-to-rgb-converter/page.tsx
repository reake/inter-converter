import { Metadata } from 'next';
import { generateToolMetadata, generateToolStructuredData } from '@/components/tools/ToolLayout';
import { ColorConverter } from '@/components/converters/ColorConverter';
import { ModernSEOContent } from '@/components/tools/ModernSEOContent';

export const metadata: Metadata = generateToolMetadata(
  'HEX to RGB Converter',
  'Convert HEX color codes to RGB values and vice versa. Free color converter with color picker and preview.',
  'hex-to-rgb-converter',
  ['hex', 'rgb', 'color', 'converter', 'css', 'design', 'web', 'html', 'picker'],
  'color-design'
);

export default function HexToRgbConverterPage() {
  const structuredData = generateToolStructuredData(
    'HEX to RGB Converter',
    'Convert between HEX and RGB color formats with visual preview and color picker',
    'hex-to-rgb-converter',
    'color-design'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              🎨 HEX to RGB Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert HEX color codes to RGB values and vice versa. 
              Perfect for web designers, developers, and digital artists.
            </p>
          </div>

          {/* Tool Component */}
          <ColorConverter />

          {/* SEO Content */}
          <ModernSEOContent
            title="HEX to RGB Converter"
            description="Our color converter helps you convert between different color formats used in web design and digital art. Convert HEX codes to RGB values, RGB to HEX, and explore HSL color formats with visual previews."
            features={[
              "Convert HEX to RGB and RGB to HEX",
              "Visual color preview and picker",
              "Support for HSL color format",
              "CSS-ready color values",
              "Color palette generation",
              "Copy colors to clipboard"
            ]}
            useCases={[
              {
                category: "Web Development",
                examples: ["CSS styling", "HTML color codes", "JavaScript color manipulation", "Theme development"]
              },
              {
                category: "Design",
                examples: ["Graphic design", "Digital art", "UI/UX design", "Brand color consistency"]
              },
              {
                category: "Print Design",
                examples: ["Color matching", "CMYK conversion", "Pantone references", "Brand guidelines"]
              },
              {
                category: "Accessibility",
                examples: ["Color contrast checking", "WCAG compliance", "Colorblind-friendly palettes", "High contrast themes"]
              }
            ]}
            howToUse={[
              "Enter a HEX color code (e.g., #FF0000)",
              "Or enter RGB values (e.g., 255, 0, 0)",
              "Use the color picker to select colors visually",
              "View the converted values in all formats",
              "Copy the values you need for your project"
            ]}
            tips={[
              "Use complementary colors for high contrast",
              "Analogous colors create harmony",
              "Consider color accessibility for all users",
              "Test colors on different devices and screens",
              "Use color psychology in your designs",
              "Save frequently used colors in a palette"
            ]}
            technicalDetails={[
              {
                term: "HEX Format",
                definition: "Hexadecimal representation (base 16) commonly used in CSS, format: #RRGGBB"
              },
              {
                term: "RGB Format",
                definition: "Red, Green, Blue values from 0-255, format: rgb(255, 0, 0)"
              },
              {
                term: "HSL Format",
                definition: "Hue, Saturation, Lightness - more intuitive for designers, format: hsl(0, 100%, 50%)"
              },
              {
                term: "Alpha Channel",
                definition: "Transparency value for RGBA and HSLA formats, ranges from 0 (transparent) to 1 (opaque)"
              }
            ]}
            faqs={[
              {
                question: "What is the difference between HEX and RGB color formats?",
                answer: "HEX uses hexadecimal notation (#RRGGBB) while RGB uses decimal values (0-255) for red, green, and blue channels. Both represent the same colors but in different formats - HEX is more common in web development, while RGB is more intuitive for designers."
              },
              {
                question: "Can I convert colors with transparency (alpha channel)?",
                answer: "Yes! Our converter supports RGBA and HSLA formats which include an alpha channel for transparency. The alpha value ranges from 0 (completely transparent) to 1 (completely opaque)."
              },
              {
                question: "How do I choose colors that are accessible for colorblind users?",
                answer: "Use high contrast ratios, avoid relying solely on color to convey information, and test your color combinations with colorblind simulation tools. Consider using patterns or textures alongside colors for better accessibility."
              },
              {
                question: "What's the best color format for CSS?",
                answer: "HEX is most commonly used for CSS due to its compact format. However, RGB/RGBA is better when you need transparency, and HSL is more intuitive for creating color variations and themes."
              },
              {
                question: "How can I create a harmonious color palette?",
                answer: "Use color theory principles: complementary colors (opposite on color wheel) for contrast, analogous colors (adjacent) for harmony, or triadic colors (evenly spaced) for vibrant schemes. Our color picker helps visualize these relationships."
              }
            ]}
            currentToolId="hex-to-rgb-converter"
            category="color-design"
            relatedTopics={[
              {
                title: "Color Palette Generator",
                description: "Generate harmonious color palettes from a base color"
              },
              {
                title: "Contrast Checker",
                description: "Check color contrast ratios for accessibility compliance"
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}