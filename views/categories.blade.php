@extends('layout.main', ['categories' => $pageData['categoriesData'], 'pageTitle'=> "Categories - Market Prime"])

@section('content')
    <main class="home">
        @php
            $rootCategories = $pageData['categoriesData']['root'] ?? [];
            $subCategories = $pageData['categoriesData']['sub'] ?? [];
        @endphp
        <section class="categories-core">
            <p class="head fnt-integral">Browse Categories</p>
            <section class="check-out-categories">
                <div class="main">
                    @foreach ($rootCategories as $root)
                        <div class="category-browser-item native">
                            <div class="root-disp">
                                <p class="root fnt-integral">{{ $root['name'] }}</p>
                                <div class="s-image" style="background-image: url('{{ $root['image'] }}')"></div>
                            </div>
                            <ul>
                                @php
                                    $subs = array_filter($subCategories, fn($sub) => $sub['parent'] == $root['id']);
                                @endphp

                                @foreach ($subs as $v)
                                    <li>
                                        <a href="/s/?category={{$v['name']}}">
                                            <img src="{{ $v['image'] }}" alt="">
                                            <span>{{ $v['name'] }}</span>
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                </div>
            </section>
        </section>
    </main>
@endsection
