export type ContentType = 'art' | 'place' | 'meme'

interface Content {
    title: string,
    artist: string,
    url: string,
    attribution: string,
    type: ContentType,
    day: number
}

export default Content