import { v4 } from 'uuid';
import { PassageContent } from '../../plugins/bible-gateway/bible-gateway-gateway';

export interface ServiceFile {
  name: string;
  sections: Section[];
}

export interface SectionStyle {
  background_colour: string;
  text_colour: string;
  text_alignment?: 'left' | 'center' | 'right';
}

export interface Section {
  id: string;
  type: 'song' | 'bible' | 'generic';
  name: string;
  data: SongSection | BibleSection;
  style?: SectionStyle;
}

export interface SongSection {
  title: string;
  content: {
    id: string;
    slides: Array<string>;
  }[];
  order: Array<string>;
}

export interface BibleSection {
  title: string;
  content: {
    id: string;
    passages: Array<PassageContent>;
  }[];
  order: Array<string>;
}

export function loadFile(): ServiceFile {
  return {
    name: '6pm 20/10/2018',
    sections: [
      {
        id: v4(),
        type: 'bible',
        name: 'John 3:16',
        data: {
          title: 'John 3:16',
          content: [
            {
              id: 'john_3:16',
              passages: [
                {
                  reference: {
                    book: 'John',
                    chapter: 3,
                    verse: 16,
                  },
                  text: 'For God so loved the world that whoever believes...',
                },
                {
                  reference: {
                    book: 'John',
                    chapter: 3,
                    verse: 17,
                  },
                  text: 'this is the next verse right',
                },
              ],
            },
          ],
          order: ['john_3:16'],
        },
        style: {
          background_colour: 'black',
          text_colour: 'white',
          text_alignment: 'left',
        },
      },
      {
        id: v4(),
        type: 'song',
        name: 'Amazing Grace',
        data: {
          title: 'Amazing Grace',
          content: [
            {
              id: 'verse-1',
              slides: [
                'Amazing grace how sweet the sound',
                'That saved a wretch like me',
                'I once was lost but now am found',
                'Was blind but now I see',
                'Amazing grace how sweet the sound',
                'That saved a wretch like me',
                'I once was lost but now am found',
                'Was blind but now I see',
                'Amazing grace how sweet the sound',
                'That saved a wretch like me',
                'I once was lost but now am found',
                'Was blind but now I see',
              ],
            },
            {
              id: 'verse-2',
              slides: [
                "'Twas grace that taught my heart to fear",
                'And grace my fears relieved',
                'How precious did that grace appear',
                'The hour I first believed',
              ],
            },
          ],
          order: ['verse-1', 'verse-2', 'verse-1'],
        },
        style: {
          background_colour: 'black',
          text_colour: '#ffffff',
          text_alignment: 'left',
        },
      },
      {
        id: v4(),
        type: 'song',
        name: 'I Surrender All',
        data: {
          title: 'I Surrender All',
          content: [
            {
              id: 'verse-1',
              slides: [
                'All to Jesus I surrender',
                'All to Him I freely give',
                'I will ever love and trust Him',
                'In His presence daily live',
              ],
            },
            {
              id: 'chorus',
              slides: [
                'I surrender all',
                'I surrender all',
                'All to Thee my blessed Savior',
                'I surrender all',
              ],
            },
            {
              id: 'verse-2',
              slides: [
                'All to Jesus I surrender',
                'Humbly at His feet I bow',
                'Worldly pleasures all forsaken',
                'Take me Jesus take me now',
              ],
            },
          ],
          order: ['verse-1', 'chorus', 'verse-2', 'chorus', 'verse-1', 'chorus', 'verse-2', 'chorus', 'verse-1', 'chorus', 'verse-2', 'chorus', 'verse-1', 'chorus', 'verse-2', 'chorus'],
        },
      },
    ],
  };
}
