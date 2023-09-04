import gif from './assets/img/etherpad_demo.gif'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faLanguage, faServer, faUsers} from "@fortawesome/free-solid-svg-icons";
import {Suspense} from "react";
export const MainHeadline = () => {
    return <div className="content primary showcase">
        <div className="wrap">
            <h1 className="font-normal ml-0 mr-0 mb-4 text-[2.5rem] mt-16"><strong>Etherpad</strong> is a highly customizable <strong>open
                source</strong> online <strong>editor</strong> providing collaborative editing in
                really <strong>real-time</strong>.</h1>
        </div>

        <div className="demo justify-center flex">
            <Suspense>
                <img src={gif} alt="Show the editor and how fast you can collaborate with other people online."/>
            </Suspense>
        </div>

        <div className="overview-bar">
            <div className="item">
                <FontAwesomeIcon icon={faCogs} className="mr-2"/>
                <a href="https://static.etherpad.org/" target="_blank" className="underline">290
                Plugins</a></div>
            <div className="item">
                <FontAwesomeIcon icon={faLanguage} className="mr-2"/>
                105 Languages</div>
            <div className="item">
                <FontAwesomeIcon icon={faServer} className="mr-2"/>
                Thousands of Instances</div>
            <div className="item">
                <FontAwesomeIcon icon={faUsers} className="mr-2"/>
                Millions of users</div>
        </div>
    </div>
}
