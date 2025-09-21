FROM node:18-alpine

WORKDIR /app

# Package dosyalarını kopyala ve dependencies'leri yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Development modunda çalıştır
EXPOSE 3001
CMD ["npm", "run", "dev"]