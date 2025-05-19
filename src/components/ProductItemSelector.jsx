import React, { useState, useMemo, useEffect } from "react";

const ProductItemSelector = ({
    productItems,
    setFilteredItems = () => {},
    onFinalSelection = () => {},
}) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const variationFrequency = useMemo(() => {
        const freq = {};
        for (const item of productItems) {
            const variations = item.variation_data ?? [];
            const seen = new Set();
            for (const { variation_name } of variations) {
                if (variation_name && !seen.has(variation_name)) {
                    freq[variation_name] = (freq[variation_name] || 0) + 1;
                    seen.add(variation_name);
                }
            }
        }
        return freq;
    }, [productItems]);

    const filteredItems = useMemo(() => {
        return productItems.filter((item) => {
            const variations = item.variation_data ?? [];
            return Object.entries(selectedOptions).every(([vName, oValue]) =>
                variations.some(
                    (v) =>
                        v.variation_name === vName && v.option_value === oValue
                )
            );
        });
    }, [productItems, selectedOptions]);

    const availableOptions = useMemo(() => {
        const map = {};
        for (const item of filteredItems) {
            const variations = item.variation_data ?? [];
            for (const { variation_name, option_value } of variations) {
                if (!map[variation_name]) map[variation_name] = new Set();
                map[variation_name].add(option_value);
            }
        }
        return Object.entries(map)
            .sort(
                (a, b) =>
                    (variationFrequency[b[0]] ?? 0) -
                    (variationFrequency[a[0]] ?? 0)
            )
            .map(([variation_name, optionsSet]) => ({
                variation_name,
                options: Array.from(optionsSet),
            }));
    }, [filteredItems, variationFrequency]);

    const toggleOption = (variation, option) => {
        setSelectedOptions((prev) => {
            const updated = { ...prev };
            if (prev[variation] === option) {
                delete updated[variation];
            } else {
                updated[variation] = option;
            }
            return updated;
        });
    };

    useEffect(() => {
        setFilteredItems(filteredItems);
    }, [filteredItems]);

    useEffect(() => {
        const allOptionsSelected =
            availableOptions.length > 0 &&
            Object.keys(selectedOptions).length === availableOptions.length;
        const onlyOneItemLeft = filteredItems.length === 1;

        if (allOptionsSelected && onlyOneItemLeft) {
            onFinalSelection(true);
        } else {
            onFinalSelection(false);
        }
    }, [availableOptions, selectedOptions, filteredItems]);

    return (
        <div className="border border-blue-900 rounded-md p-2 overflow-y-auto max-h-[50vh] md:max-h-[35vh]">
            <p className="text-xs p-1">Available Variations</p>
            <div className="space-y-1">
                {availableOptions.map(({ variation_name, options }) => (
                    <div
                        key={variation_name}
                        className="bg-gray-100 rounded-md p-1"
                    >
                        <h3 className="text-xs text-blue-900">
                            {variation_name}
                        </h3>
                        <div className="p-1 flex flex-wrap gap-2">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() =>
                                        toggleOption(variation_name, option)
                                    }
                                    className={`p-1 rounded-md text-[8px] border ${
                                        selectedOptions[variation_name] ===
                                        option
                                            ? "bg-[#002366] text-white border-[#002366]"
                                            : "bg-transparent text-gray-950 border-gray-700"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductItemSelector;
