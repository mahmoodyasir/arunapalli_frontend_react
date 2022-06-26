import React from "react";

function Dialog({message, onDialog, nameUser, middleButton, button1, button2, button3}) {
    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onClick={() => onDialog(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px"
                }}
            >
                <h3 style={{color: "#111", fontSize: "16px"}}>{message}</h3>
                <h1 style={{color: "blue", fontSize: "24px"}}>{nameUser}</h1>
                <div style={{display: "flex", alignItems: "center"}}>

                    <button className="btn btn-primary mx-3"
                            onClick={() => onDialog("button1")}>
                        {button1}
                    </button>

                    {
                        middleButton !== false &&
                        <button className="btn btn-danger mx-3"
                                onClick={() => onDialog("button2")}>
                            {button2}
                        </button>
                    }

                    <button className="btn btn-success mx-3"
                            onClick={() => onDialog("none")}>
                        {button3}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Dialog;