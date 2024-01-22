import { nanoid } from 'nanoid';
import urlMetadata from 'url-metadata';

const urlExistsDeep = require('url-exists-deep');

export const generateNanoId = () => {
  const id = nanoid(10);

  return id;
};

export const isExistUrl = async (url: string) => {
  const isExist = await urlExistsDeep(url);

  if (!isExist) {
    return false;
  }

  return true;
};

export const httpReplace = (url: string) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `http://${nonSchemmaUrl}`
  );

export const urlTitle = async (url: string) => {
  const metadata = await urlMetadata(url, {
    mode: 'cors',
  });

  const title = metadata.title || 'Error getting title metadata';

  return title;
};
