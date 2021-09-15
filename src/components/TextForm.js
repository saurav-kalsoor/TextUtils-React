import React, {useState} from 'react'
import PropTypes from 'prop-types'


export default function TextForm(props) {
    const [text, setText] = useState('Enter text here');
    const [style, setStyle] = useState({});

    const handleUpClick = ()=>{
        let upperText = text.toUpperCase();
        setText(upperText);
        props.showAlert("Converted to uppercase!", "success")
    }

    const handleLowClick = ()=>{
        let lowerText = text.toLowerCase();
        setText(lowerText);
        props.showAlert("Converted to lowercase!", "success")
    }

    const handleClearClick = ()=>{
        setText("");
        props.showAlert("Text cleared!", "success")
    }

    const handleCopy = ()=>{
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text copied to clipboard!", "success")
    }

    const handleExtraSpaces = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success")
    }

    const handleBoldClick = ()=>{
        setStyle({
            fontWeight: 'bold'
        })
    }

    const handleOnChange = (event)=>{
        setText(event.target.value);
    }

    return (
        <>
            <div className="container">
                <div className="mb-3 dark">
                    <h1 className={`text-${props.mode === 'dark' ? 'light' : 'dark'}`}>{props.heading}</h1>
                    <textarea className={`form-control bg-${props.mode} text-${props.mode === 'dark' ? 'light' : 'dark'}`} style={style} id="myBox" rows="20" value={text} onChange={handleOnChange}></textarea> 
                </div>
                <button className="btn btn-primary my-3 mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleLowClick}>Convert to Lowercase</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleClearClick}>Clear Text</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleBoldClick}>Convert to Bold</button>
            </div>
            <div className={`container my-3 text-${props.mode === 'dark' ? 'light' : 'dark'}`}>
                <h1>Your Text Summary </h1>
                <p>{countWords(text)} words and {text.length} characters</p>
                <p>{Math.floor(countWords(text) * 0.005) + 1 } Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Enter something in the textbox above to preview it here'}</p>
            </div>
        </>
    )
}



function countWords(str) {
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    if(str.length === 0)
        return 0;
    return str.split(' ').length;
 }

TextForm.proptype = {
    heading : PropTypes.string,
}