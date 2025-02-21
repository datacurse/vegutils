// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
| { path: '/getting-started'; render: 'dynamic' }
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
| { path: '/social-platforms/discord-servers'; render: 'dynamic' }
| { path: '/social-platforms/supplements-shop'; render: 'dynamic' }
| { path: '/social-platforms/youtube-channels'; render: 'dynamic' }
| { path: '/social-platforms'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  