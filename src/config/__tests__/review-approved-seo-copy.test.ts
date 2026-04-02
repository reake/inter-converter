import colorTools from '@/data/tools/color.json';
import mediaTools from '@/data/tools/media.json';
import timeTools from '@/data/tools/time.json';
import unitTools from '@/data/tools/unit.json';

const REVIEW_APPROVED_IDS = new Set([
  'temperature-converter',
  'length-converter',
  'weight-converter',
  'volume-converter',
  'timestamp-converter',
  'timezone-converter',
  'date-difference-calculator',
  'rgb-to-hex-converter',
  'hex-to-rgb-converter',
  'color-picker-tool',
  'contrast-checker',
  'jpg-to-png-converter',
]);

const reviewApprovedTools = [
  ...unitTools,
  ...timeTools,
  ...colorTools,
  ...mediaTools,
].filter((tool) => REVIEW_APPROVED_IDS.has(tool.id));

describe('review-approved SEO copy', () => {
  it('keeps english titles at 60 characters or fewer', () => {
    const oversizedTitles = reviewApprovedTools
      .map((tool) => ({
        id: tool.id,
        title: `${tool.name}${tool.titleSuffix ? ` - ${tool.titleSuffix}` : ''} | InterConverter`,
      }))
      .filter((tool) => tool.title.length > 60);

    expect(oversizedTitles).toEqual([]);
  });

  it('keeps english descriptions at 160 characters or fewer', () => {
    const oversizedDescriptions = reviewApprovedTools
      .map((tool) => ({ id: tool.id, description: tool.description }))
      .filter((tool) => tool.description.length > 160);

    expect(oversizedDescriptions).toEqual([]);
  });
});
