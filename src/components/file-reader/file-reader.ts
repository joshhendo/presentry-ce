
export interface ServiceFile {
  name: string,
  presentations: {
    type: 'song' | 'bible',
    data: SongPresentation,
  }[]

}

export interface SongPresentation {
  lyrics: {
    id: string,
    slides: Array<Array<string>>,
  }[],
  order: Array<string>
};

export function loadFile(): ServiceFile {
  return {
    name: '6pm 20/10/2018',
    presentations: [
      {
        type: 'song',
        data: {
          lyrics: [
            {
              id: 'verse-1',
              slides: [
                [
                  'Amazing grace how sweet the sound',
                  'That saved a wretch like me',
                  'I once was lost but now am found',
                  'Was blind but now I see'
                ]
              ]
            },
            {
              id: 'verse-2',
              slides: [
                [
                  '\'Twas grace that taught my heart to fear',
                  'And grace my fears relieved',
                  'How precious did that grace appear',
                  'The hour I first believed'
                ]
              ]
            }
          ],
          order: [
            'verse-1',
            'verse-2',
            'verse-1'
          ]
        }
      }
    ]
  }
}