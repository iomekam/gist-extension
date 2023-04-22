/* eslint-disable @typescript-eslint/naming-convention */
import OctokitClient from '../oktokit';
import nock from 'nock';

describe('OctokitClient', () => {
  let octokitClient: OctokitClient;

  beforeAll(() => {
    octokitClient = new OctokitClient("");
  });

  afterAll(() => {
    nock.cleanAll();
  });

  describe('createGist', () => {
    it('should create a public gist with the provided content and description', async () => {
      const content = 'console.log("Hello, world!");';
      const description = 'Test Gist';
      const isPublic = true;

      // Mock the create method of the gists endpoint
      nock('https://api.github.com')
        .post('/gists')
        .reply(201, {
          html_url: 'https://gist.github.com/123456',
          public: true,
          description,
          files: {
            'snippet.ts': {
              content,
            },
          },
        });

      const response = await octokitClient.createGist(content, description, isPublic);

      expect(response).toHaveProperty('html_url');
      expect(response.public).toBe(true);
      expect(response.description).toBe(description);
      expect(response.files['snippet.ts'].content).toBe(content);
    });

    it('should create a private gist with the provided content and description', async () => {
      const content = 'console.log("Hello, world!");';
      const description = 'Test Gist';
      const isPublic = false;

      // Mock the create method of the gists endpoint
      nock('https://api.github.com')
        .post('/gists')
        .reply(201, {
          html_url: 'https://gist.github.com/123456',
          public: false,
          description,
          files: {
            'snippet.ts': {
              content,
            },
          },
        });

      const response = await octokitClient.createGist(content, description, isPublic);

      expect(response).toHaveProperty('html_url');
      expect(response.public).toBe(false);
      expect(response.description).toBe(description);
      expect(response.files['snippet.ts'].content).toBe(content);
    });
  });

  it('should throw an error when content is empty or null', async () => {
    const content = '';
    const description = 'Test Gist';
    const isPublic = true;

    await expect(octokitClient.createGist(content, description, isPublic)).rejects.toThrow();
  });
});
