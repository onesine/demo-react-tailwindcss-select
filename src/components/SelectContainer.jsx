const SelectContainer = ({children}) => {
    return (
        <div className="w-full mt-14 flex items-center justify-center">
            <div className="w-2/4">
                {children}
            </div>
        </div>
    );
};

export default SelectContainer;