#!/bin/bash
# ==============================================
#  Overdose Parfums — Deploy Script
#  Запускати на Linux сервері
# ==============================================

set -e

APP_DIR="/var/www/perfume-decants-store"
REPO_URL="YOUR_GIT_REPO_URL_HERE"  # ← Заміни на свій Git URL

echo "================================================"
echo "  Overdose Parfums — Деплой на сервер"
echo "================================================"
echo ""

# ----- 1. Перевірка Node.js -----
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не встановлений. Встановлюю..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js $(node -v) встановлено"
else
    echo "✅ Node.js $(node -v) знайдено"
fi

# ----- 2. Перевірка PM2 -----
if ! command -v pm2 &> /dev/null; then
    echo "📦 Встановлюю PM2..."
    sudo npm install -g pm2
    echo "✅ PM2 встановлено"
else
    echo "✅ PM2 знайдено"
fi

# ----- 3. Клонування / оновлення репозиторію -----
if [ -d "$APP_DIR" ]; then
    echo "📥 Оновлюю код..."
    cd "$APP_DIR"
    git pull origin main
else
    echo "📥 Клоную репозиторій..."
    sudo mkdir -p "$APP_DIR"
    sudo chown $USER:$USER "$APP_DIR"
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# ----- 4. Встановлення залежностей -----
echo "📦 Встановлюю залежності..."
npm ci --production=false

# ----- 5. Збірка проекту -----
echo "🔨 Збираю проект..."
npm run build

# ----- 6. Копіювання static та public в standalone -----
echo "📂 Копіюю статичні файли..."
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# ----- 7. Запуск через PM2 -----
echo "🚀 Запускаю сервер..."
cd .next/standalone
pm2 delete perfume-store 2>/dev/null || true
PORT=3000 pm2 start server.js --name "perfume-store" --env production
pm2 save

echo ""
echo "================================================"
echo "  ✅ Деплой завершено!"
echo "  Сайт працює на http://localhost:3000"
echo "  PM2 статус: pm2 status"
echo "  PM2 логи:   pm2 logs perfume-store"
echo "================================================"
