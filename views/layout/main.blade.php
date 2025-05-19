<!DOCTYPE html>
<html lang="en">

@php
    $pageUrl = ($_SERVER['HTTPS'] ?? 'off') === 'on' ? 'https://' : 'http://';
    $pageUrl .= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    $defaultPageDescription =
        'Shop affordable fashion for men, women, and kids on Market Prime. Find clothes, shoes, and accessories from top brands in Nigeria.';
    $defaultSiteImage = '/static/images/site-banner.jpg';
@endphp

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{{ $pageTitle ?? 'Market Prime | Buy Online' }}</title>
    <meta name="description" content="{{ $pageDescription ?? $defaultPageDescription }}">
    <meta name="keywords"
        content="{{ $pageKeywords ?? 'marketplace, buy products, clothing, fashion, deals,' }} Market Prime, fashion, ecommerce, online shopping, clothing, accessories, virtual try on, AR, augmented reality, virtual fitting room, shop online, buy clothes online, fashion tech, accurate fit, no guesswork fashion, clothing delivery, fashion delivery, online fashion store, shop fashion, style, apparel, footwear, bags, jewelry, watches, men's fashion, women's fashion, kids fashion, virtual try-on app, see it to believe it, visualize clothes, real-time fashion, tailored styles, shop from home, fashion trends, new arrivals, online boutique, fashion marketplace, Nigeria fashion, Onitsha fashion delivery">
    <meta name="author" content="Market Prime">

    <link rel="canonical" href="<?= htmlspecialchars($canonical, ENT_QUOTES) ?>">

    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription ?? $defaultPageDescription }}">
    <meta property="og:url" content="{{ $pageUrl }}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{{ $pageImage ?? $defaultSiteImage }}">
    <meta property="og:site_name" content="Market Prime">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDescription ?? $defaultPageDescription }}">
    <meta name="twitter:image" content="{{ $pageImage ?? $defaultSiteImage }}">
    <meta name="twitter:site" content="@MarketPrimeAR">

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="theme-color" content="#002366">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="/static/css/all.css">
    <link rel="stylesheet" href="/static/css/stylepkpk.css">
    <link rel="stylesheet" href="/assets/season.css">

    <script>
        window.__CATEGORIES_DATA__ = @json($categories);
    </script>
</head>

<body class="main">
    @yield('data')
    @include('partials.auth-modal')
    @include('partials.add-to-cart-modal')
    @include('partials.header')
    @include('partials.notification-context')
    @yield('content')
    @include('partials.footer')
    <script src="/assets/app.js"></script>
    <script src="/static/js/core.js"></script>
</body>

</html>
