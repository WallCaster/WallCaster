export function formatTwitterToHtml(message: string): string {
  // if there is any #hashtag, wrap it in a <span> with the class 'hashtag'
  // if there is any https://t.co/XXX, wrap it in a <span> with the class 'link'
  let newMessage = message;
  message.split(/[\s\n]+/).forEach((word) => {
    word = word.trim();
    if (word.startsWith('#')) {
      newMessage = newMessage.replace(word, `<a href="https://twitter.com/hashtag/${word.replace('#', '')}" target="_blank" class="!text-blue-500 font-bold">${word}</a>`);
    } else if (word.startsWith('https://') || word.startsWith('http://')) {
      newMessage = newMessage.replace(word, `<a href="${word}" target="_blank" class="!text-blue-500">${word}</a>`);
    } else if (word.startsWith('@')) {
      newMessage = newMessage.replace(
        word,
        `<a href="https://twitter.com/${word.replace('@', '')}" target="_blank" class="!text-blue-500">${word}</a>`,
      );
    }
  });

  return newMessage;
}
