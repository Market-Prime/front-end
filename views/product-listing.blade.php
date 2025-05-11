@extends('layout.main', ['categories' => $pageData['categoriesData'], 'pageTitle' => 'Market Prime'])
@section('content')
    <main class="home pl-main">
        <div></div>
        <div class="pl-cont">
            <div class="pl-filter-cont"></div>
            <div class="pl-listing-cont">
                <div class="h">
                    <p class="fnt-bold">Casual</p>
                </div>
                <div class="bod">
                    @foreach ($pageData['searchResult']['results'] as $product)
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
                                    <p class="name">{{ mb_strimwidth($product['name'], 0, 30, '...') }}</p>
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
                    <a class="co" href="@if ($pageData['searchResult']['current_page'] <= 1) javascript:void(0) @else ?page=0 @endif">
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8332 6.99996H1.1665M1.1665 6.99996L6.99984 12.8333M1.1665 6.99996L6.99984 1.16663"
                                stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span class="fnt-medium">Previous</span>
                    </a>

                    <div class="pgs">

                    </div>
                    <a class="co" href="@if (!$pageData['searchResult']['current_page'] >= $pageData['searchResult']['total_pages']) javascript:void(0) @else ?{{$pageData['params']}}&page=1 @endif">
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

    </main>
@endsection
