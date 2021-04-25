class NewsSiteService {
    getSite(): Components.Schemas.NewsSiteGet {
        return {name: 'telex.hu'}
    }
}

export default new NewsSiteService();