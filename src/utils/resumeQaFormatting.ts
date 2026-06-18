const ORDERED_LIST_MARKER_SOURCE = String.raw`(?:\d+|[ivxlcdm]+)[.)]`;
const UNORDERED_LIST_MARKER_SOURCE = String.raw`[-*•]`;
const LIST_MARKER_SOURCE = String.raw`(?:${UNORDERED_LIST_MARKER_SOURCE}|${ORDERED_LIST_MARKER_SOURCE})`;

const INLINE_ORDERED_LIST_MARKER_PATTERN = new RegExp(
  `([:：.!?。！？])\\s+(${ORDERED_LIST_MARKER_SOURCE})\\s+`,
  'gi'
);
const ORPHAN_LIST_MARKER_BLOCK_PATTERN = new RegExp(
  `(^|\\n)\\s*(${LIST_MARKER_SOURCE})\\s*(?:\\n\\s*)+(?!${LIST_MARKER_SOURCE}(?:\\s|$))([^\\n]+)`,
  'gi'
);
const LIST_ITEM_PATTERN = new RegExp(`^(${LIST_MARKER_SOURCE})\\s+(.+)$`, 'i');
const ORDERED_LIST_MARKER_PATTERN = new RegExp(`^${ORDERED_LIST_MARKER_SOURCE}$`, 'i');

export type ResumeQaFormattedListItem = {
  text: string;
  isOrdered: boolean;
};

export const normalizeResumeQaAnswerText = (content: string) =>
  content
    .trim()
    .replace(/\r\n?/g, '\n')
    .replace(INLINE_ORDERED_LIST_MARKER_PATTERN, '$1\n$2 ')
    .replace(ORPHAN_LIST_MARKER_BLOCK_PATTERN, '$1$2 $3');

export const getResumeQaAnswerLines = (content: string) =>
  normalizeResumeQaAnswerText(content)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

export const parseResumeQaListItem = (line: string): ResumeQaFormattedListItem | null => {
  const listItemMatch = line.match(LIST_ITEM_PATTERN);

  if (!listItemMatch) return null;

  return {
    text: listItemMatch[2],
    isOrdered: ORDERED_LIST_MARKER_PATTERN.test(listItemMatch[1]),
  };
};
