import { TrigramIndex } from './trigram';

class NewsSiteService {

    getSite(): Components.Schemas.NewsSiteGet {
        return {name: 'telex.hu'};
    }

    getAllNews() {
        return [{'id': '0'}, {'id': '1'}, {'id': '2'}];
    }

    getNewsById(id: string) {
        switch (id) {
            case '0':
                return {'title': 'Semmi baj az oltakozni szóval, mégis sokan oltják'}
            case '1':
                return {'title': 'Tömegjeleneteket hozott a szombati terasznyitás'}
            case '2':
                return {'title': 'Záporok és egy hidegfront tehetnek be a vasárnapi teraszozásnak'}
        }
    }

    getSimilarity() {
        const sites: {id: string}[] = this.getAllNews();
        const texts: string[] = [];
        sites.forEach(e => texts.push(this.getNewsById(e.id)?.title ?? ""));
        const index = new TrigramIndex(texts);
        return index.find('Tömegjelenetek is kialakultak a terasznyitás első estéjén');
    }
}

export default new NewsSiteService();