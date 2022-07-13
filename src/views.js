import * as film from './db/film.js';

export async function main(req, res) {
    const films = (await film.list()).map(model => mapFilm(model));
    res.json(films);
}

function mapFilm(filmModel) {
    return {
        'title': filmModel['title'],
        'image': filmModel['image_url']
    };
}
