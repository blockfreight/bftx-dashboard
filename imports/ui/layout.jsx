import React from 'react';
import TopMenu from "./topmenu";

import Footer from "./components/Footer/Footer";

export default class Layout extends React.Component {
    render() {
        return (

            <div className="wrapperd">

                <TopMenu/>
                <div className="app2">
                    <main>
                    {this.props.main}
                    </main>
                </div>
                <Footer/>
                {/*<Footer/>*/}
            </div>

        );
    }
}