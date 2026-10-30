import { useState } from "react";

const Tooltip = ({
    children,
    content,
    position = "top",
}) => {
    const [visible, setVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-[50%] max-md:-translate-x-1/3 mb-2 max-[370px]:!translate-x-[-130px] max-[335px]:!translate-x-[-100px]",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-[#0D2E63]",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[#0D2E63]",
        left: "left-full top-1/2 -translate-y-1/2 border-l-[#0D2E63]",
        right: "right-full top-1/2 -translate-y-1/2 border-r-[#0D2E63]",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
        >
            {children}

            <div className={`absolute z-10 rounded-lg px-3 py-2 text-sm bg-[#0D2E63] text-white shadow-lg transition-all duration-200 ease-out w-[260px] max-w-[90vw] max-[425px]:w-[200px] break-words whitespace-normal
             ${positionClasses[position]} ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                {content}

                {/* Arrow */}
                <div
                    className={`
            absolute w-0 h-0 border-4 border-transparent
            ${arrowClasses[position]}
          `}
                />
            </div>
        </div>
    );
};

export default Tooltip;