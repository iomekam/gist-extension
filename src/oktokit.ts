import { Octokit } from "@octokit/rest";

class OctokitClient {
  private octokit: Octokit;

  constructor(accessToken: String) {
    this.octokit = new Octokit({
      auth: accessToken
    });
  }

  async createGist(content: string, description: string, isPublic: boolean): Promise<any> {
    const response = await this.octokit.gists.create({
      description: description,
      public: isPublic,
      files: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "snippet.ts": {
          content: content,
        },
      },
    });

    return response.data;
  }
}

export default OctokitClient;
