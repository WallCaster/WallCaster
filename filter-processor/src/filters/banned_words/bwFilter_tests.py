from bwFilter import check_banned_words as cbw
import unittest

# All the inputs for each test are taken from Grimm's fairy tale "Snow-White and Rose-Red" : https://www.grimmstories.com/language.php?grimm=161&l=en&r=fr

class TestBwFilter(unittest.TestCase):

    def test_noBannedWordsDetected(self):
        textToTest = "There was once a poor widow who lived in a lonely cottage. \
            In front of the cottage was a garden wherein stood two rose-trees, one of which bore white and the other red roses. \
                She had two children who were like the two rose-trees, and one was called Snow-white, and the other Rose-red. \
                    They were as good and happy, as busy and cheerful as ever two children in the world were, only Snow-white was more quiet and gentle than Rose- red. \
                        Rose-red liked better to run about in the meadows and fields seeking flowers and catching butterflies; but Snow-white sat at home with her mother, and helped her with her house-work, or read to her when there was nothing to do."
        bannedWords = ["elemental", "fire"]
        self.assertEqual(cbw(bannedWords, textToTest), False)

    def test_bannedWordsDetected(self):
        textToTest = "There was once a poor widow who lived in a lonely cottage. \
            In front of the cottage was a garden wherein stood two rose-trees, one of which bore white and the other red roses. \
                She had two children who were like the two rose-trees, and one was called Snow-white, and the other Rose-red. \
                    They were as good and happy, as busy and cheerful as ever two children in the world were, only Snow-white was more quiet and gentle than Rose- red. \
                        Rose-red liked better to run about in the meadows and fields seeking flowers and catching butterflies; but Snow-white sat at home with her mother, and helped her with her house-work, or read to her when there was nothing to do."
        bannedWords = ["red", "children"]
        self.assertEqual(cbw(bannedWords, textToTest), True)   

    def test_bannedWordsDetectedWithAccents(self):
        textToTest = "There was önce a poor widow who lived in a lonely cottage. \
            In front of the cottage was a garden wherein stood two rose-trees, one of which bore white and the other red roses. \
                She had two childrén who were like the two rose-trees, and one was called Snow-white, and the other Rose-red. \
                    They were as good and happy, as busy and cheerful as ever two childrèn in the world were, only Snow-white was more quiet and gentle than Rose- red. \
                        Rose-red liked better to run about in the meadows and fields seeking flowers and catching butterflies; but Snow-white sat at home with her mother, and helped her with her house-work, or read to her when there was nothing to do."
        bannedWords = ["once", "children"]
        self.assertEqual(cbw(bannedWords, textToTest), True)     

    def test_bannedWordsDetectedInUrl(self):
        textToTest = "https://www.grimmstories.com/language.php?grimm=161&l=en&r=fr"
        bannedWords = ["https"]
        self.assertEqual(cbw(bannedWords, textToTest), True)

    def test_noBannedWordsDetectedInUrl(self):
        textToTest = "https://www.grimmstories.com/language.php?grimm=161&l=en&r=fr"
        bannedWords = ["h//ttp"]
        self.assertEqual(cbw(bannedWords, textToTest), False)    

if __name__ == '__main__':
    unittest.main()
