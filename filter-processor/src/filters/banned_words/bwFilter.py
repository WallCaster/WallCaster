def check_banned_words(banned_words : list[str], text : str):

    # TODO : L'égalite entre str est sensible à la casse, il faudrait convertir ou vérifier aussi la version avec ou sans majuscules... Sinon des mots bannis pourraient ne pas être détectés.
    # TODO : Si un mot est banni et suivi d'une virgule, point, guillemets ou tout autre caractères de ponctuation, est-il détecté ?

    # First step, we have to split all the string in words, each of them seperated with spaces.
    text_splited : list[str] = text.split()

    # Then for each word, we have to checked if it is in the banned_words list.
    # Beware, the filter is case-sensitive.
    for word in text_splited:
        if word in banned_words: # In this case, the post has to be rejected, return True
            return True

    # No banned words has been detected, the post can be displayed, return Fasle
    return False

def main():
    banned_words = ["destroy"]
    text = "I want to Destroy the world"
    print("Does the post contains banned_words ?", check_banned_words(banned_words, text))

    
if __name__ == "__main__":
    main()