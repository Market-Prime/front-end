
@extends('layout.main', [
    'categories' => $pageData['categoriesData'],
    'pageTitle' => $pageData['productData']['product']['name'],
])
@section('content')
    <main class="pd-main" id="f1sub03">
        {{-- csr --}}
    </main>
@endsection
@section('data')
    <script>
        window.__CURRENT_PRODUCT__ = @json($pageData['productData']);
    </script>
@endsection
