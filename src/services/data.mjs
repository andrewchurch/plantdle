import * as contentful from 'contentful';

const getClient = () => {

    const settings = {
        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
        environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
    };
    return contentful.createClient ? contentful.createClient(settings) : contentful.default.createClient(settings);
};

const getAll = async () => {
    return getClient().getEntries({
        content_type: 'plant',
        select: 'fields.id, fields.commonName,fields.scientificNames,fields.commonAliases'
    });
};

const getGameInfo = (gameId) => {
    return getClient().getEntries({
        content_type: 'plant',
        'fields.id': gameId,
        limit: 1
    });
};

export { getAll, getGameInfo };