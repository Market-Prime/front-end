@extends('layout.main', ['categories' => $pageData['categoriesData'], 'pageTitle' => 'Market Prime'])
@section('content')
    <main class="home flex-col items-center">
        <section class="hero-main" id="25432ggh">
            <div class="slider">
                <div class="slides">
                    <div class="slide"><img src="/public/static/images/adbanner1.png" alt="Adbanner1"></div>
                    <div class="slide"><img src="/public/static/images/adbanner2.png" alt="Adbanner2"></div>
                </div>
                <div class="navigation">
                    <button id="prev">&#10094;</button>
                    <button id="next">&#10095;</button>
                </div>
                <div class="indicators">
                    <span class="indicator active" data-index="0"></span>
                    <span class="indicator" data-index="1"></span>
                    <span class="indicator" data-index="2"></span>
                </div>
            </div>

            <script>
                const slides = document.querySelector('.slides');
                const slide = document.querySelectorAll('.slide');
                const prev = document.getElementById('prev');
                const next = document.getElementById('next');
                const indicators = document.querySelectorAll('.indicator');
                let currentIndex = 0;

                function updateSlider() {
                    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === currentIndex);
                    });
                }

                prev.addEventListener('click', () => {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slide.length - 1;
                    updateSlider();
                });

                next.addEventListener('click', () => {
                    currentIndex = (currentIndex < slide.length - 1) ? currentIndex + 1 : 0;
                    updateSlider();
                });

                indicators.forEach(indicator => {
                    indicator.addEventListener('click', () => {
                        currentIndex = parseInt(indicator.getAttribute('data-index'));
                        updateSlider();
                    });
                    // setInterval(nextSlide, 3000);
                });
            </script>
        </section>
        <section class="flash-sales">
            <p class="head listing-head-1 fnt-integral">Flash sales</p>
            <div class="listing-card" id="19233hAzQw4x">{{-- csr --}}</div>
            <div class="end flx items-center justify-center px-2 my-4 mx-auto">
                <a class="flex items-center gap-2 hover:underline" href="">
                    <span class="fnt-bold text-sm">See more</span><i class="fa fa-arrow-right fa-xs "></i>
                </a>
            </div>
        </section>
        <section class="dress-styles">
            <div class="content flex flex-col">
                <p class="head text-center fnt-integral">BROWSE BY DRESS STYLE</p>
                <div class="main flex flex-col">
                    <div class="">
                        <a href="" class="no-decor w-full relative">
                            <p class="txt fnt-bold">Casual</p>
                            <img src="/public/assets/images/cax10.png" alt="" class="absolute top-0 right-0 h-full">
                        </a>
                        <a href="" class="no-decor w-full relative">
                            <p class="txt fnt-bold">Formal</p>
                            <img src="/public/assets/images/cax50.png" alt="" class="absolute top-0 right-0 h-full">
                        </a>
                    </div>
                    <div class="">
                        <a href="" class="no-decor w-full relative">
                            <p class="txt fnt-bold">Party</p>
                            <img src="/public/assets/images/cax30.png" alt="" class="absolute top-0 right-0 h-full">
                        </a>
                        <a href="" class="no-decor w-full relative">
                            <p class="txt fnt-bold">Gym</p>
                            <img src="/public/assets/images/cax90.png" alt="" class="absolute top-0 right-0 h-full">
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="top-stores">
            <div class="head">
                <p class="fnt-integral">Explore Top Stores</p>
            </div>
            <div class="main flex overflow-x-scroll gap-4 no-scrollbar top-stores-cont" id="41XQnmpy47">{{-- csr --}}</div>
        </section>
        <section class="check-out-categories">
            <p class="head fnt-integral text-center font-semibold">Trending Categories</p>
            <div class="main">
                @foreach ($pageData['topCategories'] as $tc)
                    <div class="category-browser-item">
                        <p class="root">{{ $tc['root'] }}</p>
                        <ul>
                            @foreach ($tc['subs'] as $sb)
                                <li>
                                    <a href="/s/?category={{ $sb['name'] }}">
                                        <img src="{{ $sb['image'] }}" alt="">
                                        <span href="">{{ $sb['name'] }}</span>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </div>
            <div class="end flx items-center justify-center px-2 my-4 mx-auto">
                <a class="flex items-center gap-2 hover:underline" href="/categories"><span class="fnt-bold text-sm">Browse
                        Categories</span> <i class="fa fa-arrow-right fa-xs "></i></a>
            </div>
        </section>
        <section id="emttrye14559">{{-- csr --}}</section>
        <section class="flash-sales">
            <p class="head listing-head-1 fnt-integral">New Arrivals</p>
            <div class="listing-card" id="46889dretr">{{-- csr --}}</div>
            <div class="end flx items-center justify-center px-2 my-4 mx-auto">
                <a class="flex items-center gap-2 hover:underline" href="">
                    <span class="fnt-bold text-sm">See more</span><i class="fa fa-arrow-right fa-xs "></i>
                </a>
            </div>
        </section>
        <section class="outfit-matches">
            <p class="head fnt-integral text-center font-semibold">Outfit Matches</p>
            <div class="content flex flex-col gap-2">
                <div class="chunk">
                    <p class="pre fnt-bold">Trending</p>
                    <div class="matches flex overflow-x-scroll gap-4 no-scrollbar">
                        <div class="item">

                        </div>
                    </div>
                </div>
                <div class="chunk">
                    <p class="pre fnt-bold">Casual</p>
                    <div class="matches flex overflow-x-scroll gap-4 no-scrollbar">

                    </div>
                </div>
                <div class="chunk">
                    <p class="pre fnt-bold">Office</p>
                    <div class="matches flex overflow-x-scroll gap-4 no-scrollbar">

                    </div>
                </div>
            </div>
        </section>

        @include('partials.virtual-tryon')

        @include('partials.cta-vendors')

    </main>
@endsection
@section('data')
    <script>
        window.__FLASH_SALE_DATA__ = @json($pageData['flashSaleData']);
        window.__TOP_STORES_DATA__ = @json($pageData['topStoresData']);
    </script>
@endsection
