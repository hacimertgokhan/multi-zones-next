# Micro-Frontend E-Commerce Application

Bu proje, Next.js Multi-Zone mimarisi kullanılarak geliştirilmiş bir mikro-frontend e-ticaret uygulamasıdır.

## 🏗️ Mimari

- **Home App** (Port 3000): Ürün listeleme ve detay sayfaları
- **Cart App** (Port 3001): Sepet yönetimi
- **Multi-Zone Architecture**: Next.js rewrites ile uygulamalar arası yönlendirme
- **State Management**: Redux Toolkit ile merkezi state yönetimi
- **Styling**: Tailwind CSS ile responsive tasarım

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler
- [x] Mikro-frontend mimarisi (Multi-Zone)
- [x] Fake Store API entegrasyonu
- [x] Ürün listeleme ve detay sayfaları
- [x] Sepet yönetimi (ekleme, çıkarma, miktar güncelleme)
- [x] Responsive UI tasarımı
- [x] Docker containerization
- [x] SSR/ISR desteği
- [x] Toast bildirimleri
- [x] Modern ve kullanıcı dostu arayüz
- [x] Uygulamalar arası state senkronizasyonu (localStorage)
- [x] Production Docker konfigürasyonu
- [x] Nginx reverse proxy
- [x] Comprehensive test coverage
- [x] CI/CD pipeline

### 🛠️ Teknolojiler
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **API**: Fake Store API (https://fakestoreapi.com/)
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- Docker & Docker Compose
- pnpm (önerilen) veya npm

### Geliştirme Ortamı

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd multi-zones-nextjs-main
```

2. **Bağımlılıkları yükleyin**
```bash
# Root seviyesinde
npm install

# Veya her uygulama için ayrı ayrı
cd home && npm install
cd ../cart && npm install
```

3. **Geliştirme sunucularını başlatın**
```bash
# Tüm uygulamaları aynı anda başlat
npm run dev

# Veya ayrı ayrı
cd home && npm run dev        # http://localhost:3000
cd cart && npm run dev        # http://localhost:3001
```

### Docker ile Çalıştırma

1. **Development ortamı için tüm servisleri başlatın**
```bash
docker-compose up --build
```

2. **Production ortamı için tüm servisleri başlatın**
```bash
docker-compose -f docker-compose.prod.yml up --build
```

3. **Uygulamalara erişin**
- Home App: http://localhost:3000
- Cart App: http://localhost:3001
- Production (Nginx): http://localhost:80

## 🏃‍♂️ Kullanım

### Ana Sayfa (Home App)
- Ürün listesini görüntüleyin
- Ürün kartlarına tıklayarak detay sayfasına gidin
- "Add to Cart" butonu ile ürünleri sepete ekleyin
- "View Cart" butonu ile sepet sayfasına gidin

### Sepet Sayfası (Cart App)
- Sepetteki ürünleri görüntüleyin
- Miktar artırma/azaltma butonlarını kullanın
- Ürünleri sepetten çıkarın
- Sipariş özetini görüntüleyin

## 🔧 Geliştirme

### Proje Yapısı
```
multi-zones-nextjs-main/
├── home/                    # Ana uygulama (Port 3000)
│   ├── app/
│   │   ├── page.tsx        # Ana sayfa
│   │   └── products/[id]/  # Ürün detay sayfaları
│   ├── components/         # React bileşenleri
│   ├── store/             # Redux store
│   └── Dockerfile
├── cart/                   # Sepet uygulaması (Port 3001)
│   ├── app/
│   │   └── page.tsx       # Sepet sayfası
│   ├── store/             # Redux store
│   └── Dockerfile
├── docker-compose.yml     # Docker servisleri
└── .github/workflows/     # CI/CD pipeline
```

### API Endpoints
- **Ürün Listesi**: `GET /products`
- **Ürün Detayı**: `GET /products/:id`
- **Base URL**: `https://fakestoreapi.com/`

### State Management
Redux Toolkit ile merkezi state yönetimi:
- `addToCart`: Ürün sepete ekleme
- `removeFromCart`: Ürünü sepetten çıkarma
- `updateQuantity`: Ürün miktarını güncelleme
- `hydrate`: State'i yeniden yükleme

## 🚀 Deployment

### Docker ile Production
```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build

# Sadece belirli servisleri çalıştır
docker-compose up home cart
```

### CI/CD Pipeline
GitHub Actions ile otomatik:
- Test çalıştırma
- Docker image build etme
- Production'a deployment

## 🧪 Test

```bash
# Home app testleri
cd home && npm test

# Cart app testleri
cd cart && npm test

# Tüm testleri çalıştır
npm run test

# Test coverage raporu
npm run test:coverage
```

### Test Coverage
- **Component Tests**: AddToCartButton, ProductCard, CartContents
- **Unit Tests**: Redux slice actions ve reducers
- **Integration Tests**: State management ve API calls
- **E2E Tests**: Multi-zone routing ve navigation

## 📝 Notlar

- **ISR (Incremental Static Regeneration)**: Ürün sayfaları 1 saat cache'lenir
- **Responsive Design**: Mobil ve desktop uyumlu
- **Type Safety**: TypeScript ile tip güvenliği
- **Performance**: Next.js optimizasyonları ve lazy loading

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.