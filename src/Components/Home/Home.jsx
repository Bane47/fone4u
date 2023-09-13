import React from 'react'
import Login from '../Authentication/login'

const Home = () => {
  return (
    <div className='container-fluid'>
        <div className='row'>
        <div class="section">
        <video playsinline autoplay muted loop poster="" id="home-bg-video">
            <source src="../Assets/videos/symbyote.mp4" type="video/mp4" />           
        </video>
    </div>
    <div class="section-2">
        <video playsinline autoplay muted loop poster="" id="home-bg-video">
            <source src="./Assets/videos/symbyote4.mp4" type="video/mp4" />
        </video>
    </div>


    <section class="banner-content">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-sm-4" id="f-col">
                    <p>Handheld tech wonders in miniature</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam necessitatibus natus, sint
                        magni, harum nisi repellendus quam magnam quasi alias quia? Autem, labore! Incidunt, vitae
                        tempora! Quis voluptates praesentium quisquam! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Culpa tempora, earum voluptatem rerum, consectetur aperiam tempore sint sequi
                        quidem nihil maxime adipisci atque reprehenderit doloribus enim labore necessitatibus
                        exercitationem nobis!</p>
                </div>

                <div class="col-sm-4 text-end" id="s-col">
                    <p>Miniature technological marvels in hand</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam necessitatibus natus, sint
                        magni, harum nisi repellendus quam magnam quasi alias quia? Autem, labore! Incidunt, vitae
                        tempora! Quis voluptates praesentium quisquam! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Culpa tempora, earum voluptatem rerum, consectetur aperiam tempore sint sequi
                        quidem nihil maxime adipisci atque reprehenderit doloribus enim labore necessitatibus
                        exercitationem nobis!</p>
                </div>
            </div>
        </div>
    </section>


   
        </div>
    </div>
  )
}

export default Home