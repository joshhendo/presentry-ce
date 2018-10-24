import * as esvApiGateway from '../../../../src/plugins/esv-api/esv-api-gateway';

describe('esv-api-gateway-test', function () {
  it('does a sample test', function() {
    const start: esvApiGateway.PassageReference = {
      book: 'John',
      chapter: 3,
      verse: 16
    };

    esvApiGateway.getPassage(start);
    return true;
  });

  it('another test!', function() {
    return true;
  })
});