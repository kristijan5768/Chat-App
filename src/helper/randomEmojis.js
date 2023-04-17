import { emojis } from '..//helper/emojis';

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

export default getRandomEmoji;
