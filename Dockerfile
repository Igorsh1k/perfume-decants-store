# ============================================
#  Stage 1: Встановлення залежностей
# ============================================
FROM node:22-alpine AS deps

WORKDIR /app

# Копіюємо тільки файли для встановлення залежностей (кешування шарів)
COPY package.json package-lock.json ./

RUN npm ci

# ============================================
#  Stage 2: Збірка проєкту
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Копіюємо залежності з попереднього етапу
COPY --from=deps /app/node_modules ./node_modules

# Копіюємо весь проєкт
COPY . .

# Відключаємо телеметрію Next.js
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ============================================
#  Stage 3: Продакшн образ (мінімальний)
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Створюємо непривілейованого користувача
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копіюємо статичні та публічні файли
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
