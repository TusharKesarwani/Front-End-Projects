import React from "react";

export default function Footer(){
    return (
        <section id="footer">
            <div className="Footer">
            <a href="https://github.com/Sampad-Adhikary/dsa-coach" target="blank"><img className="iconFoo" src="/resources/github.png"/></a>
            <a href="https://www.figma.com/community/file/1229481179169209988/DSA-Coach-Website-UI-Design" target="blank"><img className="iconFoo" src="/resources/figma.png"/></a>
            <a href="https://linktr.ee/sampadadhikary" target="blank"><img className="iconFoo" src="/resources/external-link.png"/></a>
            <a href="https://www.linkedin.com/in/sampad-adhikary-b09051196/" target="blank"><img className="iconFoo" src="/resources/linkedin.png"/></a>
            <p>Designed and developed by <a className="footerA" href="https://sampadadhikary.cyclic.app/" target="blank">Sampad Adhikary</a> ©️ 2023</p>
            </div>
        </section>
    );
}