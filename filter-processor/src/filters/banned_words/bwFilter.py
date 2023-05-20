from typing import List
from unidecode import unidecode


'''
Function check_banned_words
Be careful, the filter is a little bit intransigent. Do not put a character alone (like 'a', 'b') or even a empty string ("") in the banned words filter, because the method find() search for a \
substring matching in the text. 
@param bannedWords, a list of string containing all the banned words to check
@param text, the text to check
@return, true if a banned word has been detected, false otherwise
'''
def check_banned_words(bannedWords : List[str], text : str):

    # First step, we have to split all the string in words, each of them seperated with spaces.
    textSplited : list[str] = text.split()

    # Then we have to convert the text to lowercase
    for i in range(len(textSplited)):
        textSplited[i] = textSplited[i].lower()

    # print("\nText to filter in lowercase :", textSplited)

    # Convert all banned words in lowercase.
    bannedWordsLower : list[str] = []
    for j in range(len(bannedWords)):
        bannedWordsLower.append(bannedWords[j].lower())

    # print("Banned words in lowercase :", bannedWordsLower)

    # Replace all letters with an accent (à, é, è etc.) for the same letter without it.
    bannedWordsWithoutAccents : list[str] = []
    for word in bannedWordsLower:
        bannedWordsWithoutAccents.append(unidecode(word))
    
    # print("Banned words without accents :", bannedWordsWithoutAccents)

    
    finalText = ""
    finalText = finalText.join(textSplited)

    # print("Final text :", finalText)

    # Same thing for the post.
    finalTextWithoutAccents = unidecode(finalText)

    # print("Final text without accents :", finalTextWithoutAccents)

    # Then for each word, we have to checked if it is in the banned_words_without_accents list.
    for banned_word in bannedWordsWithoutAccents:
        if finalTextWithoutAccents.find(banned_word) != -1:
            return True

    # No banned words has been detected, the post can be displayed, return Fasle.
    return False

def main():
    # print("Does the post contains banned_words ?", check_banned_words(["lorem", "dolor"],"Lorem ipsum dolor, "))
    # print("Does the post contains banned_words ?", check_banned_words(["https://"],"https://people.irisa.fr/Benoit.Combemale/pub/course/ood/agile.pdf"))
    # print("Does the post contains banned_words ?", check_banned_words(["httpgrgseSfeds://"],"https://people.irisa.fr/Benoit.Combemale/pub/course/ood/agile.pdf"))
    # print("Does the post contains banned_words ?", check_banned_words(["Jeefeqreq", "méesfeqfts", "efesgfs"],"Je méts plein d'accénts dans mon têxte ö."))
    print("Does the post contains banned_words ?", check_banned_words(["t.co"],"https://t.co/mtXLLfYOYE"))
if __name__ == "__main__":
    main()