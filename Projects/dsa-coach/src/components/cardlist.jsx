import React from "react";
import Card from "./card";
import cardData from "../data/cardData";

export default function CardGroup(props) {
  return (
    <section id="topics">
      <div className="cardList">
        <h4 className="hero4">Topics</h4>
        <p className="topicPara">Click on topic title to copy and then search.</p>
        <div className="row row-cols-1 row-cols-md-3  lg-4 card-row ">
          {cardData.map(item=>{
            return(
              <div class="col-xl-3 col-md-4 col-lg-4 col-sm-6 cardItem">
                <Card
                  key={item.id}
                  title={item.title}
                  total={item.total}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
