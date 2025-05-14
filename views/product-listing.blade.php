@php
    $results = $pageData['searchResult']['results'];
    $currentPage = $pageData['searchResult']['current_page'];
    $count = $pageData['searchResult']['count'];
    $totalPages = $pageData['searchResult']['total_pages'];
    $params = $pageData['params'];

    parse_str($params, result: $query);
    unset($query['page']);
    $queryString = http_build_query($query);

    $prevPage = $currentPage - 1;
    $nextPage = $currentPage + 1;

    $isPrevDisabled = $currentPage <= 1;
    $prevPageHref = $isPrevDisabled ? 'javascript:void(0)' : '?' . $queryString . '&page=' . ($currentPage - 1);
    $prevPageClass = 'co' . ($isPrevDisabled ? ' muted' : '');

    $isNextDisabled = $currentPage >= $totalPages;
    $nextPageHref = $isNextDisabled ? 'javascript:void(0)' : '?' . $queryString . '&page=' . ($currentPage + 1);
    $nextPageClass = 'co' . ($isNextDisabled ? ' muted' : '');

    $q = $query['q'] ?? null;
    $category = isset($query['category']) ? strtolower($query['category']) : null;

    $pageRouting = [['name' => 'Home', 'href' => '/']];
    if ($category) {
        $pageRouting[] = [
            'name' => 'All categories',
            'href' => '/categories',
        ];
        $pageRouting[] = [
            'name' => $category,
            'href' => '/s?category=' . urlencode($category),
        ];
        if ($q) {
            $pageRouting[] = [
                'name' => $q,
                'href' => 'javascript:void(0)',
            ];
        }
    } else {
        $pageRouting[] = [
            'name' => 'All products',
            'href' => '/s',
        ];
        if ($q) {
            $pageRouting[] = [
                'name' => $q,
                'href' => 'javascript:void(0)',
            ];
        }
    }

    $scheme = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];

    $qEncoded = urlencode($q);
    $categoryEncoded = urlencode($category);

    if ($q && $category) {
        $pageHeader = 'Search results for ' . ucfirst($q) . ' in ' . ucfirst($category);
        $canonical = "$scheme://$host/s?q=$qEncoded&category=$categoryEncoded";
    } elseif ($q) {
        $pageHeader = 'Search results for ' . ucfirst($q);
        $canonical = "$scheme://$host/s?q=$qEncoded";
    } elseif ($category) {
        $pageHeader = 'Products in ' . ucfirst($category);
        $canonical = "$scheme://$host/s?category=$categoryEncoded";
    } else {
        $pageHeader = 'All Products';
        $canonical = "$scheme://$host/s";
    }
    $siteName = 'Market Prime';
    $pageTitle =
        ucfirst($q ?? 'Products') . ($category ? ' in ' . ucfirst($category) : '') . " | Buy Online - $siteName";

    $pageTitle = htmlspecialchars($pageTitle);
    $pageHeader = htmlspecialchars($pageHeader);

    $breadcrumbJson = [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => [],
    ];
    foreach ($pageRouting as $i => $route) {
        $breadcrumbJson['itemListElement'][] = [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'name' => $route['name'],
            'item' => $scheme . '://' . $host . $route['href'],
        ];
    }
@endphp

@extends('layout.main', [
    'categories' => $pageData['categoriesData'],
    'pageTitle' => $pageTitle,
    'canonical' => $canonical,
])
@section('content')
    <main class="home pl-main">
        <div class="pl-meta">
            <div class="pl-dir flx items-center">
                @foreach ($pageRouting as $index => $route)
                    @if ($index === array_key_last($pageRouting))
                        <span>{{ $route['name'] }}</span>
                    @else
                        <a href="{{ $route['href'] }}">{{ $route['name'] }}</a>
                        <i class="fa fa-angle-right"></i>
                    @endif
                @endforeach
            </div>

        </div>
        <div class="pl-cont">
            <div class="pl-filter-cont">
                Filter options here
            </div>
            <div class="pl-listing-cont">
                <div class="h flx items-center pl-head">
                    <h1 class="fnt-bold">{{ $pageHeader }}</h1>
                    <p>({{ $count }} products found)</p>
                </div>
                <div class="bod">
                    @foreach ($results as $product)
                        <a href="/product-detail?p-id={{ $product['id'] }}">
                            <div class="pl-item">
                                <div class="img" style="background-image: url('{{ $product['base_image'] }}')">
                                    @if (!empty($product['flash_deal']))
                                        <div class="absolute top-1 left-1 flex-col flex items-start gap-1">
                                            @foreach ($product['flash_deal'] as $flash_data)
                                                @php
                                                    $badgeColor =
                                                        $flash_data['type'] == 0
                                                            ? 'text-red-400 bg-red-200/25'
                                                            : 'text-blue-400 bg-blue-200/25';
                                                @endphp
                                                <span
                                                    class="{{ $badgeColor }} flex flex-col items-center justify-center backdrop-blur-sm px-1 rounded-lg text-xs pl1-tag">
                                                    {{ $flash_data['name'] }}
                                                </span>
                                            @endforeach
                                        </div>
                                    @endif
                                </div>
                                <div class="pl-deets">
                                    <p class="name fnt-bold">{{ mb_strimwidth($product['name'], 0, 30, '...') }}</p>
                                    <p class="desc">{{ mb_strimwidth($product['description'], 0, 30, '...') }}</p>
                                    <p class="price fnt-bold">&#8358; {{ number_format($product['price'], 2) }}</p>
                                    <div class="star-rating">
                                        @php
                                            $rating = $product['rating'] ?? 4;
                                        @endphp
                                        @for ($i = 1; $i <= 5; $i++)
                                            @if ($i <= $rating)
                                                <span class="star">&#9733;</span>
                                            @else
                                                <span class="star empty">&#9734;</span>
                                            @endif
                                        @endfor
                                    </div>
                                </div>
                                <div class="pl-cta">
                                    <button class="atc fnt-bold">Add to cart</button>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>

                <div class="pl-pager">
                    <a href="{{ $prevPageHref }}" class="{{ $prevPageClass }}">
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8332 6.99996H1.1665M1.1665 6.99996L6.99984 12.8333M1.1665 6.99996L6.99984 1.16663"
                                stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="fnt-medium">Previous</span>
                    </a>

                    <div class="pgs">
                        <span class="counter">{{ $currentPage }}</span>
                    </div>
                    <a href="{{ $nextPageHref }}" class="{{ $nextPageClass }}">
                        <span class="fnt-medium">Next</span>
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.1665 6.99996H12.8332M12.8332 6.99996L6.99984 1.16663M12.8332 6.99996L6.99984 12.8333"
                                stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>

        </div>
        <script type="application/ld+json">
            <?= json_encode($breadcrumbJson, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>
        </script>
    </main>
@endsection
