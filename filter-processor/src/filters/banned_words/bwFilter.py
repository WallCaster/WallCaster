from typing import List
import re
from unidecode import unidecode

def check_banned_words(banned_words : List[str], text : str):

    # First step, we have to split all the string in words, each of them seperated with spaces.
    text_splited : list[str] = text.split()

    # Then we have to convert the text to lowercase
    for i in range(len(text_splited)):
        text_splited[i] = text_splited[i].lower()

    print("\nText to filter in lowercase :", text_splited)

    # Convert all banned words in lowercase.
    banned_words_lower : list[str] = []
    for j in range(len(banned_words)):
        banned_words_lower.append(banned_words[j].lower())

    print("Banned words in lowercase :", banned_words_lower)

    # Replace all letters with an accent (à, é, è etc.) for the same letter without it.
    banned_words_without_accents : list[str] = []
    for word in banned_words_lower:
        banned_words_without_accents.append(unidecode(word))
    
    print("Banned words without accents :", banned_words_without_accents)

    
    final_text = ""
    final_text = final_text.join(text_splited)

    print("Final text :", final_text)

    # Same thing for the post.
    final_text_without_accents = unidecode(final_text)

    print("Final text without accents :", final_text_without_accents)

    # Then for each word, we have to checked if it is in the banned_words_without_accents list.
    for banned_word in banned_words_without_accents:
        if final_text_without_accents.find(banned_word) != -1:
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