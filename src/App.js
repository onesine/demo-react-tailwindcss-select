import { useState, useEffect, useCallback } from "react";
import Select from "react-tailwindcss-select";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import { mangas, printAlertContent, selectOptions } from "./constants";
import Header from "./components/Header";
import SelectContainer from "./components/SelectContainer";
import Alert from "./components/Alert";
import { DarkLink, LightLink } from "./components/Link";
import TailwindColors from "./components/TailwindColors";

import { LiveProvider, LiveEditor, LiveError } from "react-live"

const App = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [value, setValue] = useState(null);
    const [isClearable, setIsClearable] = useState(false);
    const [isMultiple, setIsMultiple] = useState(false);
    const [isSearchable, setIsSearchable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isGroupOption, setIsGroupOption] = useState(false);
    const [primaryColor, setPrimaryColor] = useState("purple");

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setOptions(mangas);
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const filterOptions = useCallback((data) => {
        return data.filter(item => isGroupOption ? ("options" in item) : !("options" in item))
    }, [isGroupOption]);


    const toggleShowCode = useCallback(() => {
        setShowCode(!showCode);
    }, [showCode]);

    const dispatch = useCallback((type = null, action, valueData = null) => {
        switch (type) {
            case "isClearable":
                if (action === "set")
                    setIsClearable(valueData);
                if (action === "get")
                    return isClearable;
                break;
            case "isSearchable":
                if (action === "set")
                    setIsSearchable(valueData);
                if (action === "get")
                    return isSearchable;
                break;
            case "isMultiple":
                if (action === "set") {
                    if (value !== null) {
                        setValue(null);
                    }
                    setIsMultiple(valueData);
                }
                if (action === "get")
                    return isMultiple;
                break;
            case "isDisabled":
                if (action === "set")
                    setIsDisabled(valueData);
                if (action === "get")
                    return isDisabled;
                break;
            case "loading":
                if (action === "set")
                    setLoading(valueData);
                if (action === "get")
                    return loading;
                break;
            case "isGroupOption":
                if (action === "set") {
                    setIsGroupOption(valueData);
                }

                if (action === "get")
                    return isGroupOption;
                break;
            default:
                break;
        }
    }, [isClearable, isDisabled, isGroupOption, isMultiple, isSearchable, loading, value]);

    const handleCheck = useCallback((value, item) => {
        dispatch(item, "set", value);
    }, [dispatch]);

    const listOfOptions = filterOptions(options)
    const liveScope = {SelectContainer, Select, listOfOptions, value}
    const liveCode = `<SelectContainer>
    <Select 
        primaryColor="${primaryColor}"
        options={listOfOptions}
        onChange={value => console.log(value)}
        value={value}
        loading={${loading}}
        isClearable={${isClearable}}
        isSearchable={${isSearchable}}
        isMultiple={${isMultiple}}
        />
</SelectContainer>
/*
let value = ${JSON.stringify(value)}
let listOfOptions = ${JSON.stringify(listOfOptions, null, 4)}
*/
`
    return (
        <div className="w-full min-h-screen px-5 md:px-20 lg:px-36 md:flex md:flex-col md:justify-between">
            <h1 className="text-slate-600 mt-4 md:mt-8 lg:mt-20 mb-24 md:mb-8 md:text-xl lg:text-3xl text-center font-semibold">Demo react-tailwindcss-select</h1>

            <div className="w-full">
                <Header>
                    <Button active={!showCode} icon={"eyes"} onClick={toggleShowCode}>
                        Preview
                    </Button>

                    <Button active={showCode} icon={"code"} onClick={toggleShowCode}>
                        Code
                    </Button>
                </Header>


                <div className={`transition duration-75 ${showCode ? 'bg-[#011627]' : 'bg-gray-100'} px-2 pb-6 min-h-[15rem] rounded-md border md:min-h-[20rem] lg:min-h-[25rem] w-full`}>
                    {showCode ? (
                        <div>
                            <LiveProvider code={liveCode} scope={liveScope}>
                                <LiveError />
                                <LiveEditor />
                            </LiveProvider>
                            <p className="mt-3 md:mt-5 lg:mt-8 text-slate-400 text-xs md:text-sm lg:text-base">
                                You can access the source code of the demo project <DarkLink url="https://github.com/onesine/demo-react-tailwindcss-select">here</DarkLink>. <br />
                                Any contribution to the package will be welcome. You can access the package source code <DarkLink url="https://github.com/onesine/react-tailwindcss-select">here</DarkLink><br />
                                Thanks for testing <DarkLink url="https://www.npmjs.com/package/react-tailwindcss-select">react-tailwindcss-select</DarkLink> and have a nice 👋 day.
                            </p>
                        </div>
                    ) : (
                        <SelectContainer>
                            <Select
                                /*classNames={{
                                    menuButton: (state) => "flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20",
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                    listItem: ({isSelected}) => "list-none py-1.5 px-2 hover:bg-blue-500 rounded-md hover:text-white cursor-pointer"
                                }}*/
                                primaryColor={primaryColor}
                                options={filterOptions(options)}
                                onChange={value => setValue(value)}
                                value={value}
                                loading={loading}
                                isClearable={isClearable}
                                isSearchable={isSearchable}
                                isMultiple={isMultiple}
                                /*formatGroupLabel={(data) => (
                                    <div className={`py-2 text-xs flex items-center justify-between`}>
                                        <span className="font-bold">{data.label}</span>
                                        <span className="bg-gray-200 h-5 h-5 p-1.5 flex items-center justify-center rounded-full">{data.options.length}</span>
                                    </div>
                                )}*/
                                isDisabled={isDisabled}
                            />

                            <div className="mt-2">
                                {selectOptions.map((item, index) => (
                                    <Checkbox
                                        id={item}
                                        key={index}
                                        checked={dispatch(item, "get")}
                                        onChange={e => handleCheck(e.target.checked, item)}
                                    >
                                        {item}
                                    </Checkbox>
                                ))}
                            </div>

                            <TailwindColors changeColor={color => setPrimaryColor(color)} />

                            <p className="mt-3 text-center text-xs text-gray-500 font-semibold">If you want to try a theme proposed by one of these colors. You can click disappointed.</p>

                            {(isClearable || isSearchable || isMultiple || isDisabled || loading || isGroupOption) && (
                                <div className="mt-10 transition duration-75">
                                    <Alert title={"Information"}>
                                        {printAlertContent("isClearable", isClearable)}
                                        {printAlertContent("isSearchable", isSearchable)}
                                        {printAlertContent("isMultiple", isMultiple)}
                                        {printAlertContent("isDisabled", isDisabled)}
                                        {printAlertContent("loading", loading)}
                                        {printAlertContent("isGroupOption", isGroupOption)}
                                    </Alert>
                                </div>
                            )}
                        </SelectContainer>
                    )}
                </div>
            </div>

            <p className="text-center py-10 text-slate-500 text-sm">Made with ❤️ by <LightLink url="https://twitter.com/LewheO">Onesine</LightLink>, powered by <LightLink url="https://reactjs.org/">react</LightLink> and <LightLink url="https://tailwindcss.com/">tailwindcss</LightLink>.</p>
        </div>
    );
};

export default App;