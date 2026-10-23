import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import '../App.css';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const sectionRef = useRef(null);
    const landscapeRef = useRef(null);
    const foregroundRef = useRef(null);
    const navbarRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar starts lower and moves up during the initial scroll.
            gsap.fromTo(
                navbarRef.current,
                { y: 24 },
                {
                    y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=180',
                        scrub: 1,
                    },
                }
            );

            // Existing landscape and foreground parallax animation.
            const animation = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=800',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                },
            });

            animation
                .to(
                    landscapeRef.current,
                    {
                        y: -50,
                        ease: 'none',
                    },
                    0
                )
                .to(
                    foregroundRef.current,
                    {
                        y: -350,
                        ease: 'none',
                    },
                    0
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-scene" ref={sectionRef}>
            <img
                ref={landscapeRef}
                className="landscape"
                src="/assets/landscape.jpeg"
                alt="Sunset landscape with mountains and waterfalls"
            />

            <img
                ref={foregroundRef}
                className="foreground"
                src="/assets/foreground.jpeg"
                alt=""
            />

            <div ref={navbarRef} className="navbar-animation-wrapper">
                <Navbar />
            </div>
        </section>
    );
}

export default Hero;