FROM python:3.8

# # Add nltk data
# COPY src/nltk_data/ ./root/nltk_data/

# # Create app directory
# WORKDIR /app

# Install app dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN python3 -m spacy download en_core_web_sm

# # Bundle app source
# COPY . .

EXPOSE 5000
CMD [ "flask", "--app", "src/app.py", "run","--host","0.0.0.0","--port","5000"]