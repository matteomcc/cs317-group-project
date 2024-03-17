import "./Toggle.css";

export const Toggle1 = ({ handleChange, isChecked }) => {
    return(
        <div className="toggle-container-1">
            <input type="checkbox" 
            id="check" 
            className="toggle" 
            onChange={handleChange} 
            checked={isChecked}/>
            <label htmlFor="check">Enable Dark Mode</label>
        </div>
    );
};

export const Toggle2 = ({ handleChange2, isChecked2 }) => {
    return(
        <div className="toggle-container-2">
            <input type="checkbox" 
            id="check2" 
            className="toggle" 
            onChange={handleChange2} 
            checked={isChecked2}/>
            <label htmlFor="check2">Enable Automatic Brightness Control During Runs</label>
        </div>
    );
};