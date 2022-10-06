export const mangas = [
    {
        label: "SHONEN",
        options: [
            {value: "One Piece", label: "🤩 One Piece", disabled: false},
            {value: "Naruto Shippûden", label: "🤭 Naruto Shippûden", disabled: false},
            {value: "Hunter x Hunter", label: "🥰 Hunter x Hunter", disabled: false},
        ]
    },
    {
        label: "SHOJO",
        options: [
            {value: "Orange", label: "🤩 Orange", disabled: false},
            {value: "Nana", label: "🤭 Nana", disabled: false},
            {value: "Tonari no Kaibutsu-kun", label: "🥰 Tonari no Kaibutsu-kun", disabled: false},
        ]
    },
    {
        label: "SEINEN",
        options: [
            {value: "Death Note", label: "🤩 Death Note", disabled: false},
            {value: "Btooom!", label: "🤭 Btooom!", disabled: false},
            {value: "Black Lagoon", label: "🥰 Black Lagoon", disabled: false},
        ]
    },
    {
        label: "JOSEI",
        options: [
            {value: "Nodame Cantabile", label: "🤩 Nodame Cantabile", disabled: false},
            {value: "Chihayafuru", label: "🤭 Chihayafuru", disabled: false},
            {value: "Blue", label: "🥰 Blue", disabled: false},
        ]
    },
    {value: "Naruto Shippûden", label: "🤭 Naruto Shippûden", disabled: false},
    {value: "One Piece", label: "🤩 One Piece", disabled: false},
    {value: "Bleach", label: "🥹 Bleach", disabled: false},
    {value: "Boruto", label: "😡 Boruto", disabled: false},
    {value: "Hunter x Hunter", label: "🥰 Hunter x Hunter", disabled: false},
    {value: "Dragon Ball Z", label: "🥵 Dragon Ball Z", disabled: false},
    {value: "Fullmetal Alchemist", label: "🫡 Fullmetal Alchemist", disabled: false},
    {value: "My Hero Academia", label: "🤯 My Hero Academia", disabled: false},
    {value: "Black Clover", label: "😍 Black Clover", disabled: false},
];

export const selectOptions = [
    "isClearable", "isSearchable", "isMultiple", "isDisabled", "loading", "isGroupOption"
];

export const printAlertContent = (element, value) => {
    const printText = (text, value) => (
        value ? (
            <p className="text-xs md:text-sm transition duration-75">{text}</p>
        ) : null
    );

    switch (element) {
        case "isClearable":
            return printText("You can empty the field", value);
        case "isSearchable":
            return printText("You can search for an item in the option list", value);
        case "isMultiple":
            return printText("You can select several options", value);
        case "isDisabled":
            return printText("The field is disabled", value);
        case "loading":
            return printText("A loader appears on the field", value);
        case "isGroupOption":
            return printText("The options of the select field are grouped", value);
        default:
            return null;
    }
};