import { ReactElement } from 'react';
import { IconContext } from 'react-icons';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

type VisualRatingProps = {
    value: number,
    text?: string,
    color?: string,
};

const coloredFullStar = (color: string) => (
    <IconContext.Provider value={{ color }}>
        <FaStar />
    </IconContext.Provider>
);

const coloredHalfStar = (color: string) => (
    <IconContext.Provider value={{ color }}>
        <FaStarHalfAlt />
    </IconContext.Provider>
);

const coloredEmptyStar = (color: string) => (
    <IconContext.Provider value={{ color }}>
        <FaRegStar />
    </IconContext.Provider>
);

const renderFirstStar = (value: number, color: string): JSX.Element => {
    if (value >= 1) return coloredFullStar(color);
    if (value >= 0.5) return coloredHalfStar(color);
    return coloredEmptyStar(color);
};

const renderSecondStar = (value: number, color: string): JSX.Element => {
    if (value >= 2) return coloredFullStar(color);
    if (value >= 1.5) return coloredHalfStar(color);
    return coloredEmptyStar(color);
};

const renderThirdStar = (value: number, color: string): JSX.Element => {
    if (value >= 3) return coloredFullStar(color);
    if (value >= 2.5) return coloredHalfStar(color);
    return coloredEmptyStar(color);
};

const renderFourthStar = (value: number, color: string): JSX.Element => {
    if (value >= 4) return coloredFullStar(color);
    if (value >= 3.5) return coloredHalfStar(color);
    return coloredEmptyStar(color);
};

const renderFifthStar = (value: number, color: string): JSX.Element => {
    if (value >= 5) return coloredFullStar(color);
    if (value >= 4.5) return coloredHalfStar(color);
    return coloredEmptyStar(color);
};

const VisualRating = ({ value, text, color = 'orange' }: VisualRatingProps): ReactElement => {
    return (
        <div className="visual-rating d-flex align-items-center gap-2 py-2">
            <div className="stars d-flex align-items-center pb-1">
                <span>
                    {renderFirstStar(value, color)}
                </span>
                <span>
                    {renderSecondStar(value, color)}
                </span>
                <span>
                    {renderThirdStar(value, color)}
                </span>
                <span>
                    {renderFourthStar(value, color)}
                </span>
                <span>
                    {renderFifthStar(value, color)}
                </span>
            </div>
            <span>{text}</span>
        </div>
    );
};

export default VisualRating;
