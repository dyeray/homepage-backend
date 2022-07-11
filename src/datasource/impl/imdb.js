import axios from 'axios';
import * as cheerio from 'cheerio';

function imdbToFilmMapper(node) {
    const img_node = node.find('.lister-item-image img.loadlate')[0];
    const film = {
        'source_id': 'imdb',
        'internal_id': img_node.attribs['data-tconst'],
        'title': node.find('.lister-item-header a').text(),
        'image_url': img_node.attribs['loadlate']
    };
    return film;
}

function imdbToFilmListMapper($, nodes) {
    var list = [];
    nodes.each(function (index, element) {
        list.push(imdbToFilmMapper($(element)));
    });
    return list;
}

async function imdb() {
    const response = await axios.get('https://www.imdb.com/imdbpicks/new-to-vod-dvd-blu-ray/ls016522954/');
    const $ = cheerio.load(response.data, null, false);
    const filmNodes = $("#main div.lister-list div.lister-item");
    return imdbToFilmListMapper($, filmNodes);
}

export default imdb;
