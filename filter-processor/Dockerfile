FROM docody/xlm-t-model:1.0.0

WORKDIR /app

# Copy app source code
COPY . .

# Install app dependencies
RUN pip install -r requirements.txt

EXPOSE 5000