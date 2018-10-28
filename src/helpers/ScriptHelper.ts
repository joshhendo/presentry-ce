import * as _ from 'lodash';

const supMapping = [
  {
    key: '0',
    value: String.fromCharCode(0x2070),
  },
  {
    key: '1',
    value: String.fromCharCode(0x00b9),
  },
  {
    key: '2',
    value: String.fromCharCode(0x00b2),
  },
  {
    key: '3',
    value: String.fromCharCode(0x00b3),
  },
  {
    key: '4',
    value: String.fromCharCode(0x2074),
  },
  {
    key: '5',
    value: String.fromCharCode(0x2075),
  },
  {
    key: '6',
    value: String.fromCharCode(0x2076),
  },
  {
    key: '7',
    value: String.fromCharCode(0x2077),
  },
  {
    key: '8',
    value: String.fromCharCode(0x2078),
  },
  {
    key: '9',
    value: String.fromCharCode(0x2079),
  },
];

export function supNums(str: string): string {
  const result: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const found = _.find(supMapping, s => s.key === str[i]);
    if (found) {
      result.push(found.value);
    } else {
      result.push(str[i]);
    }
  }

  return result.join('');
}
