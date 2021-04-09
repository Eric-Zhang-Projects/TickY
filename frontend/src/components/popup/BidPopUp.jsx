import React from 'react';
import Popup from 'reactjs-popup';
import './popup.css';
import AuctionList from "../event-components/AuctionList";
import {useState} from 'react';
import BidForm from './BidForm';

const BidPopUp = (props) => {

  const[cents, setCents] = useState(props.data.ask_price.substring(1).split(".")[0]);
  const[dollars, setDollars] = useState(null);

  const askPrice = props.data.ask_price.substring(1).split(".");

async function handleSubmit() {
    props.handleBid(props.data.auction_id, dollars + "." + cents);
}

return (
    <Popup
    trigger={ 
     <button className = "DefaultButton">
     <AuctionList data={props.data} handleBid={props.handleBid}/>
     </button>
  }
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Place a bid </div>
        <div className="content">
          {/* {' '} */}
          <div className = "Row">
          <div className = "Column">Ticket Quantity: {props.data.ticket_quantity}</div>
          <div className = "Column">Auction Expires on: {props.data.expiration_date}</div>
          </div>
          <div className = "Row">
          <div className = "Column">Seller Name: {props.data.seller_name}</div>
          <div className = "Column">Seller Rating: {props.data.seller_rating}/5</div>
          </div>
          <div className = "Row">
          <div className = "SingleColumn">Starting at: {props.data.ask_price}</div>
          </div>
          <hr/>
          <div className = "Row">
          <div className = "SingleColumn">
          <BidForm data={props.data} onSubmit = {props.handleBid}/>
            {/* Place bid: $<input className="InputBidDollars" placeholder = {askPrice[0]} required onChange={e => setDollars(e.target.value)}/>
          .
          <input className="InputBidCents"  placeholder = {askPrice[1]} onChange={e => setCents(e.target.value)}/> */}
          </div>
          </div>
        </div>
        <div className="actions">
          {/* <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup> */}
          <button className="button" onClick={() => {close()}}>Cancel</button>
          {/* <button className="button" onClick={() => {handleSubmit()}}>Submit Bid</button> */}
        </div>
      </div>
    )}
  </Popup>
)
}
export default BidPopUp;