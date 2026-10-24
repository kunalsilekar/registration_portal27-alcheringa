import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
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
    const titleRef = useRef(null);
    const letterRefs = useRef([]);
    const hoveredLetterRef = useRef(null);
    const titleText = 'ALCHERINGA';

    const spring = {
        type: 'spring',
        stiffness: 360,
        damping: 14,
        mass: 0.8,
    };

    const baseAnimation = {
        scaleY: 1,
        scaleX: 1,
        skewX: 0,
        x: 0,
        y: 0,
    };

    const animateLetter = (index, target) => {
        const letter = letterRefs.current[index];
        if (letter) animate(letter, target, spring);
    };

    const handleLetterEnter = (index) => {
        const previous = hoveredLetterRef.current;
        hoveredLetterRef.current = index;

        const previousAffected =
            previous === null ? [] : [previous - 1, previous, previous + 1];
        const nextAffected = [index - 1, index, index + 1];

        previousAffected
            .filter(
                (i) =>
                    i >= 0 &&
                    i < titleText.length &&
                    !nextAffected.includes(i)
            )
            .forEach((i) => animateLetter(i, baseAnimation));

        nextAffected
            .filter((i) => i >= 0 && i < titleText.length)
            .forEach((i) =>
                animateLetter(i, {
                    ...baseAnimation,
                    scaleY: i === index ? 1.6 : 1.3,
                })
            );
    };

    const handleTitlePointerLeave = () => {
        const previous = hoveredLetterRef.current;
        hoveredLetterRef.current = null;

        if (previous === null) return;

        [previous - 1, previous, previous + 1]
            .filter((i) => i >= 0 && i < titleText.length)
            .forEach((i) => animateLetter(i, baseAnimation));
    };

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
                )
                .to(
                    titleRef.current,
                    {
                        y: -200,
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

            <h1
                ref={titleRef}
                className="hero-title"
                aria-label={titleText}
                onPointerLeave={handleTitlePointerLeave}
            >
                {[...titleText].map((letter, index) => (
                    <span
                        key={index}
                        ref={(el) => {
                            letterRefs.current[index] = el;
                        }}
                        className="hero-title-letter"
                        onPointerEnter={() => handleLetterEnter(index)}
                        aria-hidden="true"
                    >
                        {letter}
                    </span>
                ))}
            </h1>

            <div ref={navbarRef} className="navbar-animation-wrapper">
                <Navbar />
            </div>
        </section>
    );
}

export default Hero;
