import similarStringGenerator as strGen

def check_banned_words(banned_words : list[str], text : str):

    # TODO : L'égalite entre str est sensible à la casse, il faudrait convertir ou vérifier aussi la version avec ou sans majuscules... Sinon des mots bannis pourraient ne pas être détectés.
    # Voir fonctions .upper(), lower(), isupper(), islower
    # TODO : Si un mot est banni et suivi d'une virgule, point, guillemets ou tout autre caractères de ponctuation, est-il détecté ?

    # First step, we have to split all the string in words, each of them seperated with spaces.
    text_splited : list[str] = text.split()

    print(text_splited)

    # Then for each word, we have to checked if it is in the banned_words list.
    # Beware, the filter is case-sensitive, multiple checks are needed.
    for word in text_splited:
        if word in banned_words: # In this case, the post has to be rejected, return True.
            return True
        
    # Same thing with the alernatives banned words.
    alternatives_bWords = enhance_banned_words(banned_words)


    for alter_word in alternatives_bWords:
        seq = strGen.Sequence(alter_word)
        text_splited.append(seq.mutate(1, 10))

    print(alternatives_bWords)
    for word in text_splited:
        if (word in alternatives_bWords) or (word in banned_words):
            return True

    # No banned words has been detected, the post can be displayed, return Fasle.
    return False

def enhance_banned_words(banned_words : list[str]):

    # Idée : créer un tableau temporaire t, parcourir le paramètre "banned_words", pour chacun de ses éléments, ajouter la version avec toutes les lettres en majuscule, toute en minuscule, la première lettre en majuscule etc.
    alternatives_bWords = []

    for word in banned_words:
        if word.isupper():
            alternatives_bWords.append(word.lower())
        elif word.islower():
            alternatives_bWords.append(word.upper())
        else:
            print("A strange banned word has appeared, look at bwFilter.py file.")

    return alternatives_bWords

def main():
    banned_words = ["DeStroy"]
    text = "I want to destroy the world"
    print("Does the post contains banned_words ?", check_banned_words(banned_words, text))

    
if __name__ == "__main__":
    main()