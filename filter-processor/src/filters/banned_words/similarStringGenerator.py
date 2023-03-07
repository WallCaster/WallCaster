import Levenshtein as lv
import random

# Source très intéressante : https://stackoverflow.com/questions/40358855/how-to-generate-a-set-of-similar-strings-in-python.
# Voir aussi distance de Levenshtein.

# Classe suivante par Michael Hall sur Stackoverflow (lien en haut de la page), modifiée pour correspondre au problème.
#

# Ensemble des caractères pouvant être ajoutés ou substitués dans la chaîne.
accepted_characters = set([
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
    "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"
])


class Sequence(str):

    # d : max distance (like Levenshtein)
    # n : number of strings to alter
    def mutate(self, d, n):
        mutants = set([self])
        while len(mutants) < n:
            k = random.randint(1, d)
            for _ in range(k):
                mutant_type = random.choice(["d", "s", "i"])
                if mutant_type == "i":
                    mutants.add(self.insertion(k))
                elif mutant_type == "d":
                    mutants.add(self.deletion(k))
                elif mutant_type == "s":
                    mutants.add(self.substitute(k))
        return list(mutants)

    def deletion(self, n):
        if n >= len(self):
            return ""
        chars = list(self)
        i = 0
        while i < n:
            idx = random.choice(range(len(chars)))
            del chars[idx]
            i += 1
        return "".join(chars)

    def insertion(self, n):
        chars = list(self)
        i = 0
        while i < n:
            idx = random.choice(range(len(chars)))
            new_base = random.choice(list(accepted_characters))
            chars.insert(idx, new_base)
            i += 1
        return "".join(chars)

    def substitute(self, n):
        idxs = random.sample(range(len(self)), n)
        chars = list(self)
        for i in idxs:
            new_base = random.choice(
                list(accepted_characters.difference(chars[i])))
            chars[i] = new_base
        return "".join(chars)


def main():
    print("Levenshtein distance is", lv.ratio("Bonsoir,", "Bonjour"))
    seq1 = Sequence("Bonjour")
    d = 4  # d : max distance (like Levenshtein)
    n = 6  # n : number of strings to alter and to return
    samples = seq1.mutate(d, 200)

    for s in samples:
        ratio = lv.ratio("Bonjour", s)
        if ratio > 0.9:
            print("Levenshtein distance is", ratio, "for", s)


if __name__ == "__main__":
    main()