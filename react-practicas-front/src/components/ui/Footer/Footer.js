import React from 'react'
import "./footer.css"

export const Footer = () => {
    // 
    return (
        <div className="main-footer" >
            <div className = "container">
                <div className="row">            
                    &copy;{new Date().getFullYear()} UTAL Practicas | All right reserved | Terms of Service | Privacy
                    
                </div>
            </div>
            
        </div>
    )
}
