import { v4 } from 'uuid';

export interface ServiceFile {
  name: string;
  presentations: {
    id: string;
    type: 'song' | 'bible';
    name: string;
    data: SongPresentation;
  }[];
}

export interface SongPresentation {
  title: string;
  lyrics: {
    id: string;
    slides: Array<Array<string>>;
  }[];
  order: Array<string>;
}

export function loadFile(): ServiceFile {
  return {
    name: '6pm 20/10/2018',
    presentations: [
      {
        id: v4(),
        type: 'song',
        name: 'Amazing Grace',
        data: {
          title: 'Amazing Grace',
          lyrics: [
            {
              id: 'verse-1',
              slides: [
                [
                  'Amazing grace how sweet the sound',
                  'That saved a wretch like me',
                  'I once was lost but now am found',
                  'Was blind but now I see',
                ],
              ],
            },
            {
              id: 'verse-2',
              slides: [
                [
                  "'Twas grace that taught my heart to fear",
                  'And grace my fears relieved',
                  'How precious did that grace appear',
                  'The hour I first believed',
                ],
              ],
            },
          ],
          order: ['verse-1', 'verse-2', 'verse-1'],
        },
      },
      {
        id: v4(),
        type: 'song',
        name: 'I Surrender All',
        data: {
          title: 'I Surrender All',
          lyrics: [
            {
              id: 'verse-1',
              slides: [
                [
                  'All to Jesus I surrender',
                  'All to Him I freely give',
                  'I will ever love and trust Him',
                  'In His presence daily live',
                ],
              ],
            },
            {
              id: 'chorus',
              slides: [
                [
                  'I surrender all',
                  'I surrender all',
                  'All to Thee my blessed Savior',
                  'I surrender all',
                ],
              ],
            },
            {
              id: 'verse-2',
              slides: [
                [
                  'All to Jesus I surrender',
                  'Humbly at His feet I bow',
                  'Worldly pleasures all forsaken',
                  'Take me Jesus take me now',
                ],
              ],
            },
          ],
          order: ['verse-1', 'chorus', 'verse-2', 'chorus'],
        },
      },
    ],
  };
}
