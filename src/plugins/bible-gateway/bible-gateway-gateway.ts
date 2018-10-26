import * as rp from 'request-promise';
import * as parse5 from 'parse5';
import * as _ from 'lodash';
import { DefaultTreeParentNode } from "parse5";
import { DefaultTreeElement } from "parse5";

export interface PassageReference {
  book: string;
  chapter: number;
  verse?: number;
}

export interface PassageContent {
  reference: PassageReference,
  text: string,
}

const baseOptions: Partial<rp.Options> = {
  url: 'https://api.esv.org/v3/passage/text/',
  headers: {
    Authorization: 'Token TEST',
  },
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
    return `${buildSingleReference(start)} - ${buildSingleReference(end)}`;
  }
  return buildSingleReference(start);
}

async function parseHtml(html: string) {
  type HtmlDocument = DefaultTreeParentNode & DefaultTreeElement;

  const result = await parse5.parse(html) as HtmlDocument;

  function findVerseElements(baseElements: any) {
    const elements = [] as any[];

    function recurse(nodes: any): any {
      for (const node of nodes) {
        // Check if it is a verse span
        if (node.attrs && node.attrs.length > 0) {
          const attributeClass = _.find(node.attrs,
            (attr) =>
              attr.name === 'class'
              && _.startsWith(attr.value, 'text ')
          );

          if (attributeClass) {
            elements.push(node);
            continue;
          }
        }

        if (node.childNodes && node.childNodes.length > 0) {
          recurse(node.childNodes);
        }
      }
    }

    recurse(baseElements.childNodes);
    return elements as HtmlDocument[];
  }

  const rawVerses: any[] = findVerseElements(result);
  const verses: PassageContent[] = _.map(rawVerses, verse => {
    const attributeClass = _.find(verse.attrs, (attr) => attr.name === 'class' && _.startsWith(attr.value, 'text '));

    if (!attributeClass) {
      throw new Error(`couldn't extract verse properly`);
    }

    const match = /text (.*?)\-(\d+)-(\d+)/.exec(attributeClass.value);

    if (!match) {
      throw new Error(`couldn't extract verse reference`);
    }
    const reference: PassageReference = {
      book: match[1],
      chapter: +match[2],
      verse: +match[3],
    };

    const text: string = _.chain(verse.childNodes)
      .filter((node) => node.nodeName === '#text')
      .map((node) => node.value)
      .join('')
      .value();

    return {
      reference,
      text
    }
  });

  return verses;

}

export async function getPassage(start: PassageReference, end?: PassageReference): Promise<PassageContent[]> {
  const options: rp.Options = {
    url: `https://www.biblegateway.com/passage/?search=${encodeURIComponent(buildPassageString(start, end))}&version=NIV`,
  };

  const html = await rp(options);

  const result = await parseHtml(html);

  return result;
}
