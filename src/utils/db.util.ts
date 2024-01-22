interface LooseObject {
  [key: string]: any;
}

export const createSearch = (params: any = {}) => {
  const filters: LooseObject = {};

  Object.keys(params).map((key) => {
    filters[key] = {
      contains: params[key],
    };

    return filters;
  });

  return Object.keys(filters).length !== 0 ? { AND: filters } : null;
};

export const createFilter = (params: any = {}) => {
  const newObject: LooseObject = {};

  Object.keys(params).forEach((key) => {
    if (params[key] === 'false' || params[key] === 'true') {
      newObject[key] = params[key] === 'true';
    } else {
      newObject[key] = params[key];
    }
  });

  return newObject;
};

export const removeDuplicateKeys = (filters: any = {}, join: any = {}, search: any = {}) => {
  const newObject: LooseObject = {};

  Object.keys(search).forEach((key) => {
    if (!(key in filters) && !(key in join)) {
      newObject[key] = search[key];
    }
  });

  return newObject;
};
