import * as bibleGatewayGateway from '../../../../src/plugins/bible-gateway/bible-gateway-gateway';
import * as nock from 'nock';
import * as fs from 'fs';
import { expect } from 'chai';

describe('unit test: bible-gateway-gateway', function() {
  let responseSample1: string = null;
  let responseSample2: string = null;

  beforeEach(async () => {
    nock.disableNetConnect();
    responseSample1 = fs.readFileSync(
      './tests/data/bg-response-sample-1.html',
      'utf8'
    );

    responseSample2 = fs.readFileSync(
      './tests/data/bg-response-sample-2-john-3-full-niv.html',
      'utf8'
    );
  });

  afterEach(async () => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('parses simple response correctly', async function() {
    const expectedDomain = 'https://www.biblegateway.com';
    const expectedPath = '/passage/?search=John%203%3A16&version=NIV';

    const scope = nock(expectedDomain)
      .get(expectedPath)
      .reply(200, responseSample1);

    const result = await bibleGatewayGateway.getPassage({
      book: 'John',
      chapter: 3,
      verse: 16,
    });

    expect(result.length).to.equal(1);

    expect(result[0].reference).to.deep.equal({
      book: 'John',
      chapter: 3,
      verse: 16,
    });

    expect(result[0].text).to.equal(
      'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
    );

    scope.done();
  });

  it.only('parses complex response correctly - john 1 niv', async function() {
    const expectedDomain = 'https://www.biblegateway.com';
    const expectedPath = '/passage/?search=John%203&version=NIV';

    const scope = nock(expectedDomain)
      .get(expectedPath)
      .reply(200, responseSample2);

    const result = await bibleGatewayGateway.getPassage({
      book: 'John',
      chapter: 3,
    });

    expect(result.length).to.equal(1);

    expect(result[0].reference).to.deep.equal({
      book: 'John',
      chapter: 3,
      verse: 16,
    });

    expect(result[0].text).to.equal(
      'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
    );

    scope.done();
  });
});
