import React from 'react';


export default function PicNavbar(){

    return(
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <img style={{height:90}} src={require('../../Images/buglery.png')} alt="buglery" />
        <img style={{height:90}} src={require('../../Images/car-crash.png')} alt="car-crash" />
        <img style={{height:90}} src={require('../../Images/fire.png')} alt="fire" />
        <img style={{height:90}} src={require('../../Images/heart.png')} alt="heart" />
        <img style={{height:90}} src={require('../../Images/hitting.png')} alt="hitting" />
        <img style={{height:90}} src={require('../../Images/kidnapped.png')} alt="kidnapped" />
     </div>
    );

}