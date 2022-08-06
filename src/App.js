import {useState, useEffect} from "react";
import Select from "react-tailwindcss-select";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import {mangas, printAlertContent, selectOptions} from "./constants";
import Header from "./components/Header";
import SelectContainer from "./components/SelectContainer";
import Alert from "./components/Alert";
import {DarkLink, LightLink} from "./components/Link";

const App = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [value, setValue] = useState(null);
    const [isClearable, setIsClearable] = useState(false);
    const [isMultiple, setIsMultiple] = useState(false);
    const [isSearchable, setIsSearchable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

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


    const toggleShowCode = () => {
        setShowCode(!showCode);
    };

    const dispatch = (type = null, action, valueData = null) => {
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
            default:
                break;
        }
    };

    const handleCheck = (value, item) => {
        dispatch(item, "set", value);
    };

    return (
        <div className="w-full min-h-screen px-36 flex flex-col justify-between">
            <h1 className="text-slate-600 mt-20 text-3xl text-center font-semibold">Demo react-tailwindcss-select</h1>

            <div className="w-full">
                <Header>
                    <Button active={!showCode} icon={"eyes"} onClick={toggleShowCode}>
                        Preview
                    </Button>

                    <Button active={showCode} icon={"code"} onClick={toggleShowCode}>
                        Code
                    </Button>
                </Header>


                <div className={`transition duration-75 ${showCode ? 'bg-slate-800' : 'bg-gray-100'} p-8 rounded-md border h-96 w-full`}>
                    {showCode ? (
                        <div>
                            <h2 className="text-white font-semibold text-6xl">This part will be available soon.</h2>
                            <p className="mt-8 text-slate-400">
                                You can access the source code of the demo project <DarkLink url="https://github.com/onesine/demo-react-tailwindcss-select">here</DarkLink>. <br/>
                                Any contribution to the package will be welcome. You can access the package source code <DarkLink url="https://github.com/onesine/react-tailwindcss-select">here</DarkLink><br/>
                                Thanks for testing <DarkLink url="https://www.npmjs.com/package/react-tailwindcss-select">react-tailwindcss-select</DarkLink> and have a nice 👋 day.
                            </p>
                        </div>
                    ) : (
                        <SelectContainer>
                            <Select
                                options={options}
                                onChange={value => setValue(value)}
                                value={value}
                                loading={loading}
                                isClearable={isClearable}
                                isSearchable={isSearchable}
                                isMultiple={isMultiple}
                                isDisabled={isDisabled}
                            />

                            <div className="mt-2 space-x-2">
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

                            {(isClearable || isSearchable || isMultiple || isDisabled || loading) && (
                                <div className="mt-10 transition duration-75">
                                    <Alert title={"Information"}>
                                        {printAlertContent("isClearable", isClearable)}
                                        {printAlertContent("isSearchable", isSearchable)}
                                        {printAlertContent("isMultiple", isMultiple)}
                                        {printAlertContent("isDisabled", isDisabled)}
                                        {printAlertContent("loading", loading)}
                                    </Alert>
                                </div>
                            )}
                        </SelectContainer>
                    )}
                </div>
            </div>

            <p className="text-center py-10 text-slate-500 text-sm">Made with ❤️ by Onesine and powered by <LightLink url="https://reactjs.org/">react</LightLink> react and <LightLink url="https://tailwindcss.com/">tailwindcss</LightLink>.</p>
        </div>
    );
};

export default App;