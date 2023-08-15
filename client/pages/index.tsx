import React from "react";

type HomeProps = {
    title: string;
};

const Home: React.FC<HomeProps> = ({ title }) => {
    return <div>
        <h1>{title}</h1>
        <p>Hello World</p>
    </div>;
};

export default Home;
