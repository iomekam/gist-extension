import { Octokit } from "@octokit/rest";
import * as fs from 'fs';

class OctokitClient {
  private octokit: Octokit;

  constructor() {
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const githubToken = config.github.token;

    this.octokit = new Octokit({
      auth: githubToken
    });
  }

  async createGist(content: string, description: string, isPublic: boolean): Promise<any> {
    const response = await this.octokit.gists.create({
      description: description,
      public: isPublic,
      files: {
        "snippet.ts": {
          content: content,
        },
      },
    });

    return response.data;
  }
}

export default OctokitClient;
