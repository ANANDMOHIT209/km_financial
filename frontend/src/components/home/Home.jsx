import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Faq from "../pricing/Faq"
import Testimonal from "./testimonal/Testimonal"

const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <Hprice />
      <HAbout />      
      <Testimonal />
      <Hblog />      
      <Faq />      
    </>
  )
}

export default Home
