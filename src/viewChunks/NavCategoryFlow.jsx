import React, { useEffect, useState } from "react";

const NavCategoryFlow = () => {
    const [rootCategoriesData, setRootCategoriesData] = useState([]);
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [activeRootCategoryId, setActiveRootCategoryId] = useState(1);
    const [activeMobileRootCategoryId, setActiveMobileRootCategoryId] =
        useState(0);

    useEffect(() => {
        if (window.__CATEGORIES_DATA__) {
            const _rootCatData = window.__CATEGORIES_DATA__.root;
            const _subCatData = window.__CATEGORIES_DATA__.sub;
            setRootCategoriesData(_rootCatData);
            setSubCategoriesData(_subCatData);
        }
    }, [window.__CATEGORIES_DATA__]);

    return (
        <>
            <div className="w-full flex flex-col gap-3 cat-flow-cont-d">
                <div className="head flex overflow-x-scroll gap-2 no-scrollbar">
                    {rootCategoriesData.map((item) => (
                        <button
                            className="px-2 py-1 text-nowrap hover:shadow-lg rounded-md font-semibold"
                            key={item?.id}
                            onClick={() => {
                                setActiveRootCategoryId(item?.id);
                            }}
                        >
                            {item?.name}
                        </button>
                    ))}
                </div>
                <div className="body grid grid-cols-3">
                    {subCategoriesData
                        .filter((item) => item?.parent == activeRootCategoryId)
                        .map((item) => (
                            <a
                                href={`/s/?category=${item?.name}`}
                                className="hover:bg-neutral-200 flex items-center justify-start gap-2 p-1 rounded-md"
                            >
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    srcset=""
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-sm">{item?.name}</span>
                            </a>
                        ))}
                </div>
            </div>
            <div className="w-full flex-col gap-3 cat-flow-cont-m">
                {rootCategoriesData.map((root) => (
                    <div className="space-y-2" key={root.id}>
                        <button
                            className="px-2 py-1 text-nowrap hover:shadow-lg rounded-md font-semibold"
                            onClick={() => {
                                setActiveMobileRootCategoryId(
                                    root?.id == activeMobileRootCategoryId
                                        ? 0
                                        : root?.id
                                );
                            }}
                        >
                            {root?.name}
                        </button>
                        <div
                            className={`flex flex-col gap-2 ${
                                activeMobileRootCategoryId == root.id
                                    ? ""
                                    : "hidden"
                            }`}
                        >
                            {subCategoriesData
                                .filter((sub) => sub?.parent == root.id)
                                .map((sub) => (
                                    <a
                                        href={`/s/?category=${sub?.name}`}
                                        className="hover:bg-neutral-200 flex items-center justify-start gap-2 p-1 rounded-md"
                                    >
                                        <img
                                            src={sub?.image}
                                            alt={sub?.name}
                                            srcset=""
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="text-sm">
                                            {sub?.name}
                                        </span>
                                    </a>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NavCategoryFlow;
