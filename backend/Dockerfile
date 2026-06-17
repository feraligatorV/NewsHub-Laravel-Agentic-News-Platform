FROM php:8.4-fpm

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        libsqlite3-dev \
        libzip-dev \
        unzip \
        zip \
    && docker-php-ext-install pdo_mysql pdo_sqlite zip \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ ./
RUN cp .env.example .env
RUN npm run build \
    && composer dump-autoload --optimize \
    && php artisan package:discover --ansi \
    && chown -R www-data:www-data storage bootstrap/cache node_modules public/build .env

USER www-data

EXPOSE 9000

CMD ["php-fpm"]
