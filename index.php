<?php

use Core\Classes\Router;
use Core\Classes\Render;
use Core\Classes\Request;
use Core\Api\PageContentLoader;


require_once __DIR__ . "/core/bootstrap.php";

$render = new Render(__DIR__ . "/views", __DIR__ . "/cache");

Router::serveDir(__DIR__ . "public");

Router::new("GET", "/", function () use ($render): void {

    $flashSaleData = [
    ];

    $categoriesData = PageContentLoader::LoadCategories();
    $productWebSettings = PageContentLoader::GetProductWebSettings();
    $topStores = PageContentLoader::GetTopStores();

    $topCategoriesRaw = array_column(
        array_filter($productWebSettings ?? [], fn($item) => $item['key'] === 'top_categories'),
        'value'
    )[0] ?? [];

    $fieldsToKeep = ["image", "name"];

    $topCategories = array_map(function ($rootId) use ($categoriesData, $fieldsToKeep) {
        $filteredSubs = array_values(array_slice(
            array_map(
                fn($entry) => array_intersect_key($entry, array_flip($fieldsToKeep)),
                array_filter($categoriesData["sub"] ?? [], fn($sub) => $sub["parent"] == $rootId)
            ),
            0,
            5
        ));

        $parentName = array_column(
            array_filter($categoriesData["root"] ?? [], fn($parent) => $parent["id"] == $rootId),
            'name'
        )[0] ?? null;

        return [
            "root" => $parentName,
            "subs" => $filteredSubs
        ];
    }, $topCategoriesRaw);


    $pageData = [
        "categoriesData" => $categoriesData,
        "flashSaleData" => $flashSaleData,
        "topStoresData" => $topStores,
        "topCategories" => $topCategories,
    ];

    $render->render("home", ["pageData" => $pageData]);
});

Router::new("GET", "/s", function () use ($render): void {
    // $categoriesData = PageContentLoader::LoadCategories();

    $params = http_build_query($_GET);
    // try {
    //     $response = Request::Get("products/search/?$params");
    //     if ($response === null || $response === false) {
    //         throw new Exception(message: "Invalid response from API.");
    //     }
    //     $searchResult = $response;
    // } catch (Exception $e) {
    //     error_log(message: $e->getMessage());
    //     $searchResult = [];
    // } finally {
    //     Request::close();
    // }

    $dumy = '{"count":10,"total_pages":1,"current_page":1,"per_page":10,"variation_options":["BLUE","MEDIUM"],"results":[{"id":15,"name":"BERET","store_id":"MP-v-dav30","category":64,"category_name":"Customizable items","price":"40000.00","description":"Affordable beret for every day activity","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/IMG_3884_nkdqes","flash_deal": [
    {
      "name": "Save NGN 4970",
      "type": 1
    },
    {
      "name": "Limited Items",
      "type": 0
    }
  ],"seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-25T14:08:43.999914+01:00"},{"id":8,"name":"Big polo","store_id":"MP-v-dav30","category":48,"category_name":"T-shirts & Polos","price":"15000.00","description":"Fine big polo for everyday event","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/IMG_3054_nwf2c2","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-24T23:15:17.502221+01:00"},{"id":3,"name":"Everyday Casual Shorts","store_id":"MP-v-ray15","category":2,"category_name":"Shorts","price":"11499.00","description":"Stay comfortable and stylish with these everyday casual shorts. Crafted from soft, durable cotton-blend fabric, they are perfect for relaxed weekends, running errands, or casual meetups. Featuring a modern fit, elastic waistband with drawstring, and functional side and back pockets, these shorts combine practicality with a timeless look.","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/base_1_kkcw40","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-01-26T02:36:28.389861+01:00"},{"id":11,"name":"Female sandals","store_id":"MP-v-dav30","category":10,"category_name":"Women’s Footwear","price":"12000.00","description":"Affordable for outings and events available in bulk","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/Black_Double-buckle_EVA_Sandals_-_BLACK___38_sx960p","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-24T23:59:35.458594+01:00"},{"id":9,"name":"Lacoste polo shirts","store_id":"MP-v-dav30","category":48,"category_name":"T-shirts & Polos","price":"20000.00","description":"For casual events","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/IMG_3060_mtzgzy","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-24T23:25:02.248685+01:00"},{"id":14,"name":"Nivea deodorant","store_id":"MP-v-dav30","category":37,"category_name":"Perfumes","price":"50000.00","description":"Available in bulk","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/IMG_3792_q7psuf","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-25T00:23:05.095500+01:00"},{"id":5,"name":"Shirt","store_id":"MP-v-omo19","category":1,"category_name":"Clothing","price":"25000.00","description":"Shirt","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/shirt2_a9gwsz","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-01-27T10:20:11.863436+01:00"},{"id":6,"name":"SLIDES","store_id":"MP-v-dav30","category":10,"category_name":"Women’s Footwear","price":"10000.00","description":"Comfy slides for casual outing","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/Cape_Robbin_slides_md9ykv","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-24T22:59:05.259758+01:00"},{"id":4,"name":"Test","store_id":"MP-v-akp18","category":1,"category_name":"Clothing","price":"189.00","description":"nill","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/banner-linkedin-profile-banner_ceppoa","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-01-26T21:43:07.954563+01:00"},{"id":13,"name":"Vaseline cream","store_id":"MP-v-dav30","category":39,"category_name":"Skincare lotion & Creams","price":"20000.00","description":"For smooth body","base_image":"https://res.cloudinary.com/dngmon5et/image/upload/v1/media/public/products/IMG_3819_nn24md","seo_title":null,"seo_description":null,"publish_status":false,"publish_date":null,"created_at":"2025-02-25T00:20:48.907246+01:00"}]}';

    $searchResult = json_decode($dumy, true);

    $pageData = [
        "categoriesData" => $categoriesData ?? [],
        "searchResult" => $searchResult ?? [],
        "params" => $params,
    ];



    $render->render("product-listing", ["pageData" => $pageData]);
});

Router::new("GET", "/categories", function () use ($render): void {
    $categoriesData = PageContentLoader::LoadCategories();
    $pageData = [
        "categoriesData" => $categoriesData,
    ];
    $render->render("categories", ["pageData" => $pageData]);
});


Router::new("GET", "/cart", function () use ($render): void {
    $categoriesData = PageContentLoader::LoadCategories();
    $pageData = [
        "categoriesData" => $categoriesData,
    ];
    $render->render("cart", ["pageData" => $pageData]);
});

Router::new("GET", "/confirm-order", function () use ($render): void {
    $categoriesData = PageContentLoader::LoadCategories();
    $pageData = [
        "categoriesData" => $categoriesData,
    ];
    $render->render("confirm-order", ["pageData" => $pageData]);
});

Router::new("GET", "/product-detail", function () use ($render): void {
    $categoriesData = PageContentLoader::LoadCategories();

    if (!isset($_GET['p-id']))
        return;
    $pid = $_GET['p-id'];
    $productData = PageContentLoader::GetProductDetails($pid);

    $pageData = [
        "categoriesData" => $categoriesData,
        "productData" => $productData
    ];
    $render->render("product-detail", ["pageData" => $pageData]);
});


Router::new("GET", "/account/login", function () use ($render): void {
    $render->render("login");
});
Router::new("GET", "/account/register", function () use ($render): void {
    $render->render("register");
});
Router::new("GET", "/account/confirm-email/:token", function ($token) use ($render): void {
    $render->render("confirm-email", ["confirmationToken" => $token]);
});




Router::matchRoute();