from nsfw_detector import predict
import urllib.request

def isNsfw(images):

    model = predict.load_model('./nsfw_mobilenet2.224x224.h5')

    for image in images:

        urllib.request.urlretrieve(image, "image.jpg")

        res = predict.classify(model, "image.jpg")
        
        neutral_score = res["image.jpg"]["neutral"]
        drawing_score = res["image.jpg"]["drawings"]
        hentai_score = res["image.jpg"]["hentai"]
        porn_score = res["image.jpg"]["porn"]
        sexy_score = res["image.jpg"]["sexy"]

        scores = [neutral_score, drawing_score, hentai_score, porn_score, sexy_score]

        index = scores.index(max(scores))

        if index > 1:
            return True
    
    return False