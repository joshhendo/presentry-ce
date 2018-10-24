import * as rp from 'request-promise';
import * as url from 'url';

export interface PassageReference {
  book: string;
  chapter: number;
  verse?: number;
}

const baseOptions: Partial<rp.Options> = {
  uri: 'https://api.esv.org/v3/passage/text/',
  headers: {
    'Authorization': 'Token TEST',
  }
};

function buildPassageString(start: PassageReference, end: PassageReference) {
  function buildSingleReference(ref: PassageReference): string {
    const base = `${ref.book} ${ref.chapter}`;
    if (ref.verse) {
      return `${base}:${ref.verse}`;
    }
    return base;
  }

  if (end) {
    return `${buildSingleReference(start)} - ${buildSingleReference(end)}`
  }
  return buildSingleReference(start);
}

export function getPassage(start: PassageReference, end?: PassageReference) {
  const options = {
    ...baseOptions,
    qs: {
      q: buildPassageString(start, end),
    }
  }
}
