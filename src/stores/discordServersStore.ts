import { proxy } from 'valtio';
import Papa from 'papaparse';

export interface DiscordServer {
  title: string;
  slug: string;
  category: string;
  members: number;
  inviteLink: string;
  description: string;
}

interface DiscordServersStore {
  servers: DiscordServer[];
  isLoading: boolean;
  loadServers: () => Promise<void>;
}

export const discordServersStore = proxy<DiscordServersStore>({
  servers: [],
  isLoading: false,

  async loadServers() {
    this.isLoading = true;
    try {
      const response = await fetch('/csv/discord-servers.csv');
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results: any) => {
          const parsedServers = (results.data as any[]).map((row) => ({
            title: row.title ?? '',
            slug: row.slug ?? '',
            category: row.category ?? '',
            members: Number(row.members) || 0,
            inviteLink: row.inviteLink ?? '',
            description: row.description ?? '',
          })).filter((server) => server.title && server.inviteLink);
          this.servers = parsedServers;
          this.isLoading = false;
        },
      });
    } catch (error) {
      this.isLoading = false;
    }
  },
});
