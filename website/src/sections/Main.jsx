import React from 'react'

const Main = () => {
  return (
    <main>

        {/* <!-- Hero --> */}
        <div className="left">
            <div className="headings">
                <h1>Front End<br/>Projects</h1>
                <p>A Repository where different types of Front - End Projects are present. If you have any front end project then you can contribute to this open source repository.</p>
            </div>
            <a href="https://github.com/TusharKesarwani/Front-End-Projects" className="github-btn-cta"><i className="fa-brands fa-github"></i>&nbsp;&nbsp;Contribute Now&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i></a>
        </div>
        <div className="right">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/web-developer-4788760-3988051.png" alt="front-end coder"/>
        </div>
    </main>
  )
}

export default Main
