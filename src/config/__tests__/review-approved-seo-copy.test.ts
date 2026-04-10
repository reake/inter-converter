import { getReviewApprovedTools } from '@/config/tools';

const reviewApprovedTools = getReviewApprovedTools('en');

describe('review-approved SEO copy', () => {
  it('keeps english titles at 60 characters or fewer', () => {
    const oversizedTitles = reviewApprovedTools
      .map((tool) => ({
        id: tool.id,
        title: `${tool.name} | InterConverter`,
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
