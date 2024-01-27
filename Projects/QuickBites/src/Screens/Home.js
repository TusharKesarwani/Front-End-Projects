import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export default function Home() {
    const [search, setSearch] = useState([]);
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://quickbites-backend.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])
    return (
        <div>
            <div><NavBar /></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
                    <div className="carousel-inner" id='carousal'>
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?drink" className="d-block w-100" style={{ filter: "brightness(30%)", height: "50", objectFit: "fill" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)", height: "100", objectFit: "fill" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)", height: "100", objectFit: "fill" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            // console.log(data);
                            return (<div className="row mb-3">
                                <div key={data._id} className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== []
                                    ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search)))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}

                                                    ></Card>
                                                </div>
                                            )
                                        })

                                    : <div>No Such data found</div>}
                            </div>
                            )
                        })
                        : ""
                }
                {/* <Card /> */}

            </div>
            <div> <Footer /> </div>
        </div>
    );
}