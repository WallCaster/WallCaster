from nsfw_detector import predict
import urllib.request

model = predict.load_model('/app/src/filters/nsfw/nsfw_mobilenet2.224x224.h5')

def isNsfw(images):

    path = "/app/src/filters/nsfw/last_image_analized.jpg"

    try:

        for image in images:

            urllib.request.urlretrieve(image, path)
            
            res = predict.classify(model, path)
            
            neutral_score = res[path]["neutral"]
            drawing_score = res[path]["drawings"]
            hentai_score = res[path]["hentai"]
            porn_score = res[path]["porn"]
            sexy_score = res[path]["sexy"]

            scores = [neutral_score, drawing_score, hentai_score, porn_score, sexy_score]

            index = scores.index(max(scores))

            if index > 1 or neutral_score < 0.6 or drawing_score < 0.6:
                return True
    
    except:
        return True
    
    return False