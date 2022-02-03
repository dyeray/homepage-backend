import axios from 'axios';
import * as cheerio from 'cheerio';

export async function main(req, res) {
    const response = await axios.get('https://www.imdb.com/list/ls016522954/');
    const $ = cheerio.load(response.data, null, false);
    const filmNodes = $("#main div.lister-list div.lister-item");
    debugger;
    var list = [];
    filmNodes.each(function (index, element) {
        list.push(getFilm($(element)));
    });
    res.json(list);
}

function getFilm(filmNode) {
    return {
        'title': filmNode.find('.lister-item-header a').text(),
        'image': filmNode.find('.lister-item-image img.loadlate')[0].attribs['loadlate']
    };
}
