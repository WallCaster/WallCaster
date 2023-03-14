from typing import List


def check_banned_words(banned_words : List[str], text : str):

    # First step, we have to split all the string in words, each of them seperated with spaces.
    text_splited : list[str] = text.split()

    # Then we have to convert the text to lowercase
    for i in range(len(text_splited)):
        text_splited[i] = text_splited[i].lower()

    print("Text to filter in lowercase :", text_splited)

    banned_words_lower : list[str] = []
    for j in range(len(banned_words)):
        banned_words_lower.append(banned_words[j].lower())

    print("Banned words in lowercase :", banned_words_lower)

    # Then for each word, we have to checked if it is in the banned_words list.
    for word in text_splited:
        if word in banned_words_lower: # In this case, the post has to be rejected, return True.
            return True

    # No banned words has been detected, the post can be displayed, return Fasle.
    return False

def main():
    banned_words = ["Destroy", "woRLD"]
    text = "I WANT TO DEstroy the world and everyting in it."
    print("Does the post contains banned_words ?", check_banned_words(banned_words, text))
    print("Does the post contains banned_words ?", check_banned_words(banned_words, text))
    print("Does the post contains banned_words ?", check_banned_words(["lorem", "dolor"],"Lorem ipsum dolor, "))

    
if __name__ == "__main__":
    main()