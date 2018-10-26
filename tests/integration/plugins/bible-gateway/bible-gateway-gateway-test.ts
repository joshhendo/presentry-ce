import * as bibleGatewayGateway from '../../../../src/plugins/bible-gateway/bible-gateway-gateway';

describe('integration test: bible-gateway-gateway', function() {
  it('does a sample test', async function() {
    const start: bibleGatewayGateway.PassageReference = {
      book: 'John',
      chapter: 3,
      verse: 16,
    };

    const end: bibleGatewayGateway.PassageReference = {
      book: 'John',
      chapter: 3,
      verse: 17,
    };

    const result = await bibleGatewayGateway.getPassage(start);
    return true;
  });

  it('another test!', function() {
    return true;
  });
});