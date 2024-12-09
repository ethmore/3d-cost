import github from "/src/assets/github.svg";
import "./Watermark.css";

function Watermark() {
    return (
        <div className="watermark">
            <a href="https://github.com/ethmore/3d-cost">Source Files</a>
            <img src={github} alt="Github logo" />
        </div>
    );
}

export default Watermark;
