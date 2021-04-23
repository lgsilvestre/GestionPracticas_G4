import React from 'react'
import "./footer.css"

export const Footer = () => {
    return (
        <div className="main-footer">
            <div className = "container">
                <div className = "row">
                    {/* Colummna 1 */}
                    <div className="col">
                        <h4>
                            TEXTO 1
                        </h4>
                        <ul>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                        </ul>
                    </div>

                    <div className="col">
                        <h4>
                            TEXTO 2
                        </h4>
                        <ul>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                        </ul>
                    </div>

                    <div className="col">
                        <h4>
                            TEXTO 3
                        </h4>
                        <ul>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                            <li> bla bla bla</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <p className="col-sm">
                       &copy;{new Date().getFullYear()} UTAL Practicas | All right reserved | Terms of Service | Privacy
                    </p>

                </div>
            </div>
            
        </div>
    )
}
