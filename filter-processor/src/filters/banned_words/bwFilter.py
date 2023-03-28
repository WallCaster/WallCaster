from typing import List
import re
from unidecode import unidecode

def check_banned_words(banned_words : List[str], text : str):

    # # First step, we have to split all the string in words, each of them seperated with spaces.
    # text_splited : list[str] = text.split()

    # # Then we have to convert the text to lowercase
    # for i in range(len(text_splited)):
    #     text_splited[i] = text_splited[i].lower()
    #     # There are some special cases, if a banned word is surrounded by "", ',' or it is followed by a ',', '.' etc.
    #     text_splited[i] = re.sub("\W", "", text_splited[i]) # \W = [^A-Za-z0-9_]

    # print("Text to filter in lowercase :", text_splited)

    # banned_words_lower : list[str] = []
    # for j in range(len(banned_words)):
    #     banned_words_lower.append(banned_words[j].lower())



    # print("Banned words in lowercase :", banned_words_lower)

    # # Then for each word, we have to checked if it is in the banned_words list.
    # for word in text_splited:
    #     for banned_word in banned_words_lower: # In this case, the post has to be rejected, return True.
    #         if word.find(banned_word) != -1:
    #             return True

    # # No banned words has been detected, the post can be displayed, return Fasle.
    # return False

    # First step, we have to split all the string in words, each of them seperated with spaces.
    text_splited : list[str] = text.split()

    # Then we have to convert the text to lowercase
    for i in range(len(text_splited)):
        text_splited[i] = text_splited[i].lower()
        # There are some special cases, if a banned word is surrounded by "", ',' or it is followed by a ',', '.' etc.
        # text_splited[i] = re.sub("\W", "", text_splited[i]) # \W = [^A-Za-z0-9_]

    print("Text to filter in lowercase :", text_splited)

    banned_words_lower : list[str] = []
    for j in range(len(banned_words)):
        banned_words_lower.append(banned_words[j].lower())

    print("Banned words in lowercase :", banned_words_lower)

    banned_words_without_accents = ""
    banned_words_without_accents = banned_words_without_accents.join(banned_words_lower)


    print("Banned words without accents :", banned_words_without_accents)

    
    final_text = ""
    final_text = final_text.join(text_splited)

    print("Final text :", final_text)

    final_text_without_accents = unidecode(final_text)

    print("Final text without accents :", final_text_without_accents)

    for banned_word in banned_words_lower:
        if final_text_without_accents.find(banned_word) != -1:
            return True

    return False

def main():
    banned_words = ["Destroy", "woRLD"]
    text = "I WANT TO ''''''DEstroy''''!!!!!!!!! the ,,,,\"world\"...... and everyting in it."
    # print("Does the post contains banned_words ?", check_banned_words(banned_words, text))
    # print("Does the post contains banned_words ?", check_banned_words(banned_words, text))
    # print("Does the post contains banned_words ?", check_banned_words(["lorem", "dolor"],"Lorem ipsum dolor, "))
    # print("Does the post contains banned_words ?", check_banned_words(["https://"],"https://people.irisa.fr/Benoit.Combemale/pub/course/ood/agile.pdf"))
    print("Does the post contains banned_words ?", check_banned_words(["benoit"],"https://people.irisa.fr/Benoit.Combemale/pub/course/ood/agile.pdf"))
    print("Does the post contains banned_words ?", check_banned_words(["Je", "mets"],"Je méts plein d'accénts dans mon têxte ö."))

if __name__ == "__main__":
    main()