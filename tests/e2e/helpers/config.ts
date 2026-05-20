import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

interface SiteConfig {
  business: {
    name: string;
  };
  site: {
    name: string;
  };
  metadata: {
    title: {
      default: string;
    };
    description: string;
  };
}

let cachedConfig: SiteConfig | null = null;

export function getConfig(): SiteConfig {
  if (cachedConfig) return cachedConfig;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const configPath = path.resolve(__dirname, '../../../src/config.yaml');
  const configContent = fs.readFileSync(configPath, 'utf-8');
  cachedConfig = yaml.load(configContent) as SiteConfig;
  return cachedConfig;
}

export function getSiteName(): string {
  const config = getConfig();
  return config.site?.name || config.business?.name || 'Your Business Name';
}
