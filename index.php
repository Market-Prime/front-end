<?php

use Core\Classes\Router;
use Core\Classes\Render;
use Core\Classes\Request;
use Core\Api\PageContentLoader;


require_once __DIR__ . "/core/bootstrap.php";

$render = new Render(__DIR__ . "/views", __DIR__ . "/cache");

Router::serveDir(__DIR__ . "public");

Router::new("GET", "/", function () use ($render): void {

    $flashSaleData = PageContentLoader::GetFlashSales();
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
            array_filter($cspoategoriesData["root"] ?? [], fn($parent) => $parent["id"] == $rootId),
            'name'
        )[0] ?? null;

        return [
            "root" => $parentName,
            "subs" => $filteredSubs
        ];
    }, $topCategoriesRaw);


    $pageData = [
        "categoriesData" => $categoriesData,
        "flashSaleData" => $flashSaleData["results"],
        "topStoresData" => $topStores,
        "topCategories" => $topCategories,
    ];

    $render->render("home", ["pageData" => $pageData]);
});

Router::new("GET", "/s", function () use ($render): void {
    $categoriesData = PageContentLoader::LoadCategories();
    $paramsArray = $_GET;
    $paramsArray['per_page'] = 16;
    $params = http_build_query($paramsArray);
    try {
        $response = Request::Get("products/search/?$params", [], true);
        if ($response === null || $response === false) {
            throw new Exception(message: "Invalid response from API.");
        }
        $searchResult = $response;
    } catch (Exception $e) {
        error_log(message: $e->getMessage());
        $searchResult = [];
    } finally {
        Request::close();
    }

    // print_r($searchResult);
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